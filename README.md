[![Build status](https://img.shields.io/github/workflow/status/kaskadi/template-action/build?label=build&logo=mocha)](https://github.com/kaskadi/template-action/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-init?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-init?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/action-init?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-init?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-init/?mode=list)

****

# What is this action for?

This action is initializing new repositories generated from the templates in `Kaskadi`.

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-init@master
      with:
        repoType: {YOUR-REPO-TYPE}
```

The `repoType` input accepts the following values:
- `action`
- `api`
- `lambda`
- `element`
- `layer`

It determines which type of repository we're trying to initialize.

**If you do not need to sign your commits via GPG**: simply replace the `Import GPG key` step of the job by:
```
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values
