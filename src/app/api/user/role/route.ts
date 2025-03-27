import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';
import { Role } from '@prisma/client';

export async function PUT(request: Request) {
  try {
    console.log('Role update request received');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    
    if (!session?.user?.id) {
      console.log('No user ID in session');
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);
    const { role } = body;

    if (!role) {
      console.log('No role provided');
      return NextResponse.json(
        { message: 'Role is required' },
        { status: 400 }
      );
    }

    // Validate role value
    if (!Object.values(Role).includes(role)) {
      console.log('Invalid role value:', role);
      return NextResponse.json(
        { message: 'Invalid role value' },
        { status: 400 }
      );
    }

    console.log('Updating user role in database...');
    console.log('User ID:', session.user.id);
    console.log('New role:', role);

    // First, verify the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!existingUser) {
      console.log('User not found in database');
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Current user role:', existingUser.role);

    // Update user role in the database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role: role as Role },
    });

    console.log('User updated successfully:', {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      { message: 'Role updated successfully', user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Role update error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error updating role' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        role: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error fetching user role' },
      { status: 500 }
    );
  }
} 