[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-init/build?label=build&logo=mocha)](https://github.com/kaskadi/action-init/actions?query=workflow%3Abuild)
[![Static code analysis status](https://img.shields.io/github/workflow/status/kaskadi/action-init/analyze-code?label=codeQL&logo=github)](https://github.com/kaskadi/action-init/actions?query=workflow%3Aanalyze-code)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/action-init/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/action-init/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-init?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-init?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/action-init?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)

****

{{>main}}
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
