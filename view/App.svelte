<script>
import { currentTab, set, get } from "./jira-browser";
import { getIssueList, getJira, mapExistingHelper } from "./jira-api";
import config from "../jira-config.json";
import { text } from "svelte/internal";

const baseUrl = config.baseUrl;
const statusColour = {
  "In Progress": "blue",
  "Closed": "green"
}
let trackedJiras = [];
let fetchedText = "";
let copyText = "Copy";

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
  const listKeys = trackedJiras.map((issue) => issue.key);
  getIssueList(listKeys).then(function(data) {
    trackedJiras = mapExistingHelper(trackedJiras, data);
    set(trackedJiras);
    toggleText("", "Sync updated", 3000, (txt) => {
      fetchedText = txt;
    });
  });
}

function copyBtn(evt){
  evt.stopPropagation();
  const jiraKey = evt.currentTarget.dataset.jiraKey;
  navigator.clipboard.writeText(`${baseUrl}browse/${jiraKey}`);
  toggleText("Copy", "Copied", 1000, (txt) => copyText = txt);
}

function toggleText(currentText, tempText, delay, hook){
  hook(tempText);
  setTimeout(() => {
    hook(currentText)
  }, delay);
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
  <h3>Tracked: <button on:click={syncBtn}>Sync</button> {fetchedText}</h3>
  <p>Count: <span class="status-badge">{trackedJiras.length}</span></p>
  {#each trackedJiras as jira}
    <div class="track-row">
      <p><a href={`${baseUrl}browse/${jira.key}`} target="_blank">{jira.key}</a> 
        
        <button data-jira-key={jira.key} on:click={removeBtn}>Remove</button>
        <button data-jira-key={jira.key} on:click={copyBtn}>{copyText}</button>
      </p>
      <p><span class="status-badge {statusColour[jira.status] || ""}">{jira.status}</span> {jira.summary}</p>
    </div>
  {/each}
</div>

<style>
  .track-row {
    border: 1px solid rgb(91, 61, 91);
    border-radius: 4px;
    padding: 0 4px;
    margin-bottom: 4px;
  }
  .status-badge {
    display: inline-block;
    background-color: rgb(91, 61, 91);
    padding: 2px 6px;
    border-radius: 2px;
    font-weight: bold;
  }

  .status-badge.blue {
    background-color: rgb(0, 19, 194);
  }
  .status-badge.green {
    background-color: rgb(0, 143, 98);
  }
</style>