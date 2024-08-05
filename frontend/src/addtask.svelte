<script>
  import { getAccessToken, getRefreshToken, refreshToken, saveTokens } from './auth.js'; 
  import { writable } from 'svelte/store';

  let title = '';
  let description = '';
  let status = 'pending';
  let due_date = '';
  let isLoading = writable(false);
  let notification = writable('');

  const addTask = async () => {
    isLoading.set(true);
    let token = getAccessToken(); // Retrieving the current token
    try {
      const response = await fetch('http://127.0.0.1:8055/items/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, status, due_date })
      });

      if (response.ok) {
        alert('Task added successfully');
        // Optionally clear the form or fetch the updated task list
        isLoading.set(false);
        notification.set('Task added successfully');
        return;
      }

      if (response.status === 401) { 
        const refreshTokenValue = getRefreshToken();
        token = await refreshToken(refreshTokenValue); // Refresh token
        saveTokens(token, refreshTokenValue); // Save new access token
        return addTask(); // Retry adding task with new token
      }

      throw new Error('Failed to add task');
    } catch (error) {
      console.error('Error adding task:', error);
      notification.set('Error adding task');
    } finally {
      isLoading.set(false);
    }
  };
</script>

<form on:submit|preventDefault={addTask} class="space-y-4">
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
    <input type="text" id="title" bind:value={title} class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
  </div>
  <div>
    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
    <textarea id="description" bind:value={description} class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
  </div>
  <div>
    <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
    <select id="status" bind:value={status} class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
  </div>
  <div>
    <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date</label>
    <input type="datetime-local" id="due_date" bind:value={due_date} class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
  </div>
  <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Task</button>
</form>

{#if $isLoading}
  <div class="text-blue-500 mt-2">Loading...</div>
{/if}

{#if $notification}
  <div class="text-green-500 mt-2">{$notification}</div>
{/if}