<script>
  import { createEventDispatcher } from 'svelte';
  import { handleLogin } from './login.js';

  const dispatch = createEventDispatcher();
  
  let username = '';
  let password = '';
  let errorMessage = '';

  const login = async () => {
    try {
      await handleLogin(username, password);
      dispatch('login-success');
    } catch (error) {
      errorMessage = 'Login failed. Please check your credentials and try again.';
      console.error(error);
    }
  };
</script>

<form on:submit|preventDefault={login}>
  <div>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />
  </div>
  {#if errorMessage}
    <div class="error">{errorMessage}</div>
  {/if}
  <button type="submit">Login</button>
</form>

<style>
  .error {
    color: red;
  }
</style>

