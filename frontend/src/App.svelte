<script>
  import { onMount } from 'svelte';
  import Login from './login.svelte';
  import AddTask from './addtask.svelte';
  import TaskList from './tasklist.svelte';

  let isLoggedIn = false;

  const checkLogin = () => {
    const token = localStorage.getItem('access_token');
    isLoggedIn = !!token;
  };

  onMount(() => {
    checkLogin();
  });

  const handleLoginSuccess = () => {
    isLoggedIn = true;
  };
</script>

{#if isLoggedIn}
  <main class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Task Management App</h1>
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Add New Task</h2>
      <AddTask />
    </div>
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Task List</h2>
      <TaskList />
    </div>
  </main>
{:else}
  <main class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Login</h1>
    <Login on:login-success={handleLoginSuccess} />
  </main>
{/if}




<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .bg-white {
    background-color: white;
  }

  .shadow {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  .max-w-3xl {
    max-width: 48rem;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .font-bold {
    font-weight: 700;
  }

  .text-center {
    text-align: center;
  }

  .text-gray-900 {
    color: #1a202c;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .max-w-full {
    max-width: 100%;
  }
</style>

