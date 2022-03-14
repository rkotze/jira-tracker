import config from "../jira-config.json"

async function fetchJira(key){
  const res = await fetch(`${config.baseUrl}rest/api/latest/issue/${key}`);
  return res.json();
}

async function fetchJiraIssues(keys){
  const res = await fetch(`${config.baseUrl}rest/api/2/search?jql=issueKey in (${keys.join(",")})`);
  return res.json();
}

function jiraListItem(jiraRes){
  return {
    id: jiraRes.id,
    key: jiraRes.key,
    summary: jiraRes.fields.summary,
    status: jiraRes.fields.status.name
  }
}

async function getJira(key) {
  return jiraListItem(await fetchJira(key));
}

async function getIssueList(keys) {
  const list =  await fetchJiraIssues(keys);
  return list.issues.map(jiraListItem);
}

function mapExistingHelper(existing, refreshed){
  return existing.map((exJira) => refreshed.find((reJira) => reJira.id == exJira.id));
}

export {
  getJira,
  getIssueList,
  mapExistingHelper
}