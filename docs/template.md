[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-init/build?label=build&logo=mocha)](https://github.com/kaskadi/action-init/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-init?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-init?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/action-init?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-init)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-init?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-init/?mode=list)

****

{{>main}}
**In order to sign the commit for your newly generated docs via GPG**: add the following `step` before the actual documentation generation step:
```
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
```

**If you do not need to sign your commit via GPG**: simply replace the `Import GPG key` step of the job by:
```
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```
