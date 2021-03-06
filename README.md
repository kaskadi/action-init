[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-init/build?label=build&logo=mocha)](https://github.com/kaskadi/action-init/actions?query=workflow%3Abuild)
[![Static code analysis status](https://img.shields.io/github/workflow/status/kaskadi/action-init/analyze-code?label=codeQL&logo=github)](https://github.com/kaskadi/action-init/actions?query=workflow%3Aanalyze-code)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/action-init/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/action-init/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-init?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-init?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/action-init?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)

****

# What is this action for?

This action is initializing new repositories generated from the templates in `Kaskadi`

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```yaml
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-init@master
      with:
        repoType: {REPOTYPE-VALUE}
      env:
        CC_TOKEN: {CC_TOKEN-VALUE}
        GH_ACCESS_TOKEN: {GH_ACCESS_TOKEN-VALUE}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Inputs:**
|    Input   | Required | Default | Description                                                                                          |
| :--------: | :------: | :-----: | :--------------------------------------------------------------------------------------------------- |
| `repoType` |  `true`  |         | Type of repository to initialize. Accepted values are: `action`, `api`, `lambda`, `element`, `layer` |

**Environment variables:**
|      Variable     | Required | Description                                                                                                                                                                                                                                      |
| :---------------: | :------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `CC_TOKEN`    |  `false` | _Code Climate_ token used for authenticating with _Code Climate_ API. **If this is not provided the action will not automatically add your repository to _Code Climate_.**                                                                       |
| `GH_ACCESS_TOKEN` |  `false` | _GitHub_ personal access token used for interacting with the calling GitHub repository. This must at least contain the `repo` scope to work as intended. **If the token is not provided the action will not automatically update your secrets.** |

**In order to sign the commit made by this action**: add the following `step` before the one using `action-init`:
```yaml
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
```

**If you do not need to sign via GPG**: simply replace the `Import GPG key` step of the job by:
```yaml
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```
