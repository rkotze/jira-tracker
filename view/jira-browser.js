async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function currentTab() {
  const tab = await getCurrentTab();
  const curUrl = new URL(tab.url);
  if(!(curUrl.host.includes("jira") && curUrl.pathname.includes("browse"))){
    return{
      isJira: false,
      key: null,
      url: curUrl,
      title: tab.title
    };
  }
  const key = curUrl.pathname.split("/").pop();
  
  return {
    isJira: true,
    key: key,
    url: curUrl,
    title: tab.title
  };
}

const STORE_KEY = "jira-tracker"
async function set(jiraListItem){
  return new Promise(function(resolve, reject){
    if(Array.isArray(jiraListItem)){
      chrome.storage.sync.set({[STORE_KEY] : jiraListItem}, function() {
        resolve(jiraListItem);
      });
    }else{
      reject("Error: Bad format, must be an Array");
    }

  })
}

async function get(){
  return new Promise(function(resolve){
    chrome.storage.sync.get([STORE_KEY], function(result) {
      const tickets = result[STORE_KEY];
      if(Array.isArray(tickets)){
        return resolve(tickets);
      }

      return resolve([]);
    });
  })
}

export {
  currentTab,
  set,
  get
}