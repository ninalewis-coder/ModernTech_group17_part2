<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
<!-- Navigation Bar -->
<nav class="navbar navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <RouterLink to="/" class="navbar-brand" href="#">
      <img src="@/assets/ModernTech-dark.png" alt="logo" height="50" class="me-2">Modern Tech HR
    </RouterLink>

    <!-- Toggle Button -->
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      <span class="d-none d-lg-inline"> Menu</span>
    </button>

    <!-- Items & Links -->
    <div class="offcanvas offcanvas-end text-bg-dark custom-sidebar" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
          Menu
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      
      <div class="offcanvas-body d-flex flex-column">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" aria-current="page" href="#">
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/attendance" class="nav-link" href="#">
              Attendance
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/employees" class="nav-link" href="#">
              Employees
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/leave" class="nav-link" href="#">
              Leave
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/payroll" class="nav-link" href="#">
              Payroll
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/reviews" class="nav-link" href="#">
              Reviews
            </RouterLink>
          </li>
          
          <li class="nav-item dropdown mt-auto">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              store.currentUser.name
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <small class="dropdown-item">
                store.currentUser.name
                </small>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <RouterLink to="" class="dropdown-item" href="#">
                  Logout
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
  .custom-sidebar {
    width: 250px;
  }

@media (max-width: 768px) {
  .custom-sidebar {
    width: 220px;
  }
}

@media (max-width: 576px) {
  .custom-sidebar {
    width: 180px;
  }
}
</style>
