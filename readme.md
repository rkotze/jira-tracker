# Jira tracker

Track Jira tickets. 

**Disclaimer**: Just a quick hack, might be a little unstable if you decide to use it.

## Using the extension

- Setup a config file in root folder `jira-config.json`
- Run `npm i`
- Run `npm run build`

`jira-config.json` :

```
{
  baseUrl: "https://jira.atlassian.com"
}
```

## Get Started

[Get started tutorial](https://developer.chrome.com/extensions/getstarted), first step shows how to setup the developer version to test it.

[Jira RestAPI](https://developer.atlassian.com/server/jira/platform/rest-apis/);

## Tasks

- [x] Pop up view listing Jira tickets
- [x] Get Jira data from RestAPI
- [x] Track Jira ticket by adding from current tab
- [x] Remove Jira ticket from tracking
- [x] Sync action to update all tracked tickets
- [ ] Copy to clipboard link to jira ticket
- [ ] Scan all tabs for jira tickets
- [ ] Embed a add and copy to clipboard action on Jira ticket links.
