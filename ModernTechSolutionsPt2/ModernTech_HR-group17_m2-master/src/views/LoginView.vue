<template>
  <div class="login-container">
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
      <div class="login-body p-5 text-center">
        <h1 class="card-title fw-bold text-purple">ModernTech HR System</h1>
        <p class="text-muted">Employee and Payroll Management</p>

        <form @submit.prevent="handleLogin" class="mt-4">
          <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email</label>
            <input
              type="email"
              class="form-control form-control-lg"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label fw-bold">Password</label>
            <input
              type="password"
              class="form-control form-control-lg"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div
            v-if="errorMessage"
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {{ errorMessage }}
            <button type="button" class="btn-close" @click="errorMessage = ''"></button>
          </div>

          <button type="submit" class="btn btn-success btn-lg w-100 mb-3">
            <i class="bi bi-check-circle me-1"></i> Login
          </button>
        </form>

        <hr />

        <div class="demo-credentials">
          <h6 class="fw-bold mb-3">Demo Credentials (Admin & Manager Only):</h6>

          <div class="credential-item mb-2">
            <small><strong>Admin:</strong></small><br />
            <small class="text-muted">Email: hr.admin@moderntech.com</small><br />
            <small class="text-muted">Password: admin123</small>
          </div>

          <div class="credential-item mb-2">
            <small><strong>Manager:</strong></small><br />
            <small class="text-muted">Email: hr.manager@moderntech.com</small><br />
            <small class="text-muted">Password: manager123</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',

  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    // Valid credentials
    const validCredentials = [
      { email: 'hr.admin@moderntech.com', password: 'admin123', name: 'HR Admin', role: 'admin' },
      { email: 'hr.manager@moderntech.com', password: 'manager123', name: 'HR Manager', role: 'manager' }
    ]

    const handleLogin = () => {
      errorMessage.value = ''

      // Find matching user
      const user = validCredentials.find(
        cred => cred.email === email.value && cred.password === password.value
      )

      if (!user) {
        errorMessage.value = 'Invalid email or password. Please use the demo credentials provided.'
        password.value = ''
        return
      }

      // Set authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userName', user.name)
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userRole', user.role)

      // Redirect to home page
      router.push('/')
    }

    return {
      email,
      password,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  /* ★ Background Image */
  background-image: url('@/assets/logo.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%;
  position: relative;
}

/* ★ Fade effect overlay */
.login-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.55); /* fade/soften */
  z-index: 0;
}

.login-body {
  position: relative;
  z-index: 1; /* shows above fade */
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.text-purple {
  color: rgb(163, 101, 201);
}

.btn-purple {
  background-color: rgb(163, 101, 201);
  border: none;
  color: white;
}
.btn-purple:hover {
  background-color: rgb(150, 85, 190);
}

.demo-credentials {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.85rem;
}

.credential-item {
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  border-left: 4px solid #9b59b6;
}

@media (max-width: 576px) {
  .login-body {
    margin: 20px;
    padding: 32px 24px;
  }
}
</style>
