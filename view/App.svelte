<script>
import { currentTab, set, get } from "./jira-browser";
import { getJira } from "./jira-api";
import config from "../jira-config.json";

const baseUrl = config.baseUrl;
let trackedJiras = [];


get().then(function(data){
  trackedJiras = data;
});

function trackBtn(evt){
  evt.stopPropagation();
  const jiraKey = evt.currentTarget.dataset.jiraKey;
  getJira(jiraKey).then(function(data) {
    trackedJiras = [...trackedJiras, data];
    set(trackedJiras);
  });
}

function removeBtn(evt){
  evt.stopPropagation();
  const jiraKey = evt.currentTarget.dataset.jiraKey;
  trackedJiras = trackedJiras.filter((jira) => jira.key !== jiraKey);
}

function syncBtn(evt){
  evt.stopPropagation();
}

</script>


<div> 
  {#await currentTab() then tab}
  {#if tab.isJira && !trackedJiras.find((jira) => jira.key === tab.key)}
    <h3>Current tab:</h3>
      <p>{tab.title}
        <button data-jira-key={tab.key} on:click={trackBtn}>Track</button>
      </p> 
    {/if}
  {/await}
  <h3>Tracked: <button on:click={syncBtn}>Sync</button></h3>
  {#each trackedJiras as jira}
    <div class="track-row">
      <p><a href={`${baseUrl}browse/${jira.key}`}>{jira.key}</a> {jira.status} 
        <button data-jira-key={jira.key} on:click={removeBtn}>Remove</button>
      </p>
      <p>{jira.summary}</p>
    </div>
  {/each}
</div>

<style>
  .track-row {
    border-bottom: 1px solid #dcd;
  }
</style>