import App from "./App.svelte";
import config from "../jira-config.json"

new App({
  target: document.getElementById("jira-tracker-app")
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function start(){
  const curTab = await getCurrentTab();
  console.log("🚀 ~ file: popup.js ~ line 10 ~ start ~ curTab", curTab);
  const curUrl = new URL(curTab.url);
  if(!curUrl.host.includes("jira")){
    return;
  }
  const jiraId = curUrl.pathname.split("/").pop();
  const {key, summary, status } = jiraListItem(await fetchJira(jiraId));
  
  document.getElementById("test").innerHTML = `${key}: ${status}: ${summary}`;
}

async function fetchJira(id){
  const res = await fetch(`${config.baseUrl}rest/api/latest/issue/${id}`);
  return res.json();
}

function jiraListItem(jiraRes){
  return {
    key: jiraRes.key,
    summary: jiraRes.fields.summary,
    status: jiraRes.fields.status.name
  }
}

start();