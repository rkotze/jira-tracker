import config from "../jira-config.json"

async function fetchJira(key){
  const res = await fetch(`${config.baseUrl}rest/api/latest/issue/${key}`);
  return res.json();
}

function jiraListItem(jiraRes){
  return {
    key: jiraRes.key,
    summary: jiraRes.fields.summary,
    status: jiraRes.fields.status.name
  }
}

async function getJira(key) {
  return jiraListItem(await fetchJira(key));
}

export {
  getJira
}