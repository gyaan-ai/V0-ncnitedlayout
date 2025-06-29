import { supabase } from "@/lib/database/client"
import { ProfileService } from "@/lib/database/profiles"
import type { UserRole } from "@/lib/database/types"

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

export class AuthService {
  // Sign up new user
  static async signUp(data: SignUpData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: data.role,
        },
      },
    })

    if (authError) {
      throw new Error(`Sign up failed: ${authError.message}`)
    }

    if (authData.user) {
      // Create profile
      try {
        await ProfileService.createProfile({
          id: authData.user.id,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          role: data.role,
          phone: data.phone,
          is_active: true,
        })
      } catch (profileError) {
        console.error("Failed to create profile:", profileError)
        // Note: User is created but profile failed - handle this case
      }
    }

    return authData
  }

  // Sign in user
  static async signIn(data: SignInData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new Error(`Sign in failed: ${error.message}`)
    }

    return authData
  }

  // Sign out user
  static async signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(`Sign out failed: ${error.message}`)
    }
  }

  // Get current user
  static async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      throw new Error(`Failed to get user: ${error.message}`)
    }

    return user
  }

  // Get current user with profile
  static async getCurrentUserWithProfile() {
    const user = await this.getCurrentUser()

    if (!user) return null

    const profile = await ProfileService.getProfileById(user.id)

    return { user, profile }
  }

  // Reset password
  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      throw new Error(`Password reset failed: ${error.message}`)
    }
  }

  // Update password
  static async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      throw new Error(`Password update failed: ${error.message}`)
    }
  }
}
