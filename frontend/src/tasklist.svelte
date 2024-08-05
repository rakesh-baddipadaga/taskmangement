<script>
import { onMount } from 'svelte';
import { getAccessToken, getRefreshToken, refreshToken, saveTokens } from './auth.js'; 

let tasks = [];
let token = getAccessToken(); 
//let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMWE2OGZiLWVlZTctNDUyOS04ZjczLTcxMmI1NjU1MjcxMCIsInJvbGUiOiJiODUzYjNkZC04ZjRmLTQ5OGMtYWY3MC0zZWU3ZjZiZWFlYjkiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTcyMjgzMzM2OSwiZXhwIjoxNzIyODM0MjY5LCJpc3MiOiJkaXJlY3R1cyJ9.J1Kec9qXnhM3SyJR3_VrAI_sV55mjPDHtjsW2-opMgk'

const fetchTasks = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8055/items/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      tasks = data.data;
      return; // Successfully fetched tasks
    }

    if (response.status === 401) { // Unauthorized, possibly due to token expiry
      const refreshTokenValue = getRefreshToken();
      token = await refreshToken(refreshTokenValue); // Refresh token
      saveTokens(token, refreshTokenValue); // Save new access token
      return fetchTasks(); // Retry fetching tasks with new token
    }

    throw new Error('Failed to fetch tasks');
  } catch (error) {
    console.error('Error fetching tasks:', error);
    alert('Error fetching tasks');
  }
};

onMount(fetchTasks);

const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8055/items/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      tasks = tasks.filter(task => task.id !== taskId);
      alert('Task deleted successfully');
      return; // Successfully deleted task
    }

    if (response.status === 401) { // Unauthorized, possibly due to token expiry
      const refreshTokenValue = getRefreshToken();
      token = await refreshToken(refreshTokenValue); // Refresh token
      saveTokens(token, refreshTokenValue); // Save new access token
      return deleteTask(taskId); // Retry deleting task with new token
    }

    throw new Error('Failed to delete task');
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Error deleting task');
  }
};
</script>

{#if tasks.length > 0}
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b">Description</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Due Date</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each tasks as task}
          <tr>
            <td class="py-2 px-4 border-b">{task.title}</td>
            <td class="py-2 px-4 border-b">{task.description}</td>
            <td class="py-2 px-4 border-b">{task.status === '1' ? 'Completed' : 'Pending'}</td>
            <td class="py-2 px-4 border-b">{new Date(task.due_date).toLocaleString()}</td>
            <td class="py-2 px-4 border-b">
              <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>No tasks available.</p>
{/if}

<style>
  .table-container {
    max-width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background-color: #f7fafc;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f7fafc;
  }

  button {
    cursor: pointer;
  }
</style>


