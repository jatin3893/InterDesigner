#!/usr/bin/python

import git, glob, os, mmap, datetime

def log(str):
    print '# ', str

def log2(strKey, strVal):
    print '#', strKey, '\t\t\t', strVal

# Important parameters:
publishBranch = 'gh-pages'
masterBranch = 'master'
modifiedFiles = []
configText = "<script>\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-49678720-3', 'auto');ga('send', 'pageview');\n</script>"
repo = git.Repo.init(os.getcwd())

log2('Publish Branch: ', publishBranch)
log2('Master Branch', masterBranch)
log2('Configuration: ', configText)

# Store current branch and checkout gh-pages
oldBranch = repo.active_branch

# Merge master into publish branch
repo.git.checkout(publishBranch)
repo.git.merge(masterBranch)

# Change all .html files with the ga code
for path, dirs, files in os.walk(os.getcwd()):
    for f in files:
        if f.endswith('.html'):
            htmlFile = open(path + '/' + f, 'a+')
            contents = mmap.mmap(htmlFile.fileno(), 0, access = mmap.ACCESS_READ)
            if contents.find('GoogleAnalyticsObject') == -1:
                htmlFile.write(configText)
                modifiedFiles.append(f)
            htmlFile.close()

# Commit and Push the changes to gh-pages if HEAD is dirty
# Add date time in commit messgae for reference
if len(modifiedFiles) != 0:
    commitMessage = '-m ' + '"' + datetime.datetime.now().__str__() + ': Add ga track code to gh-pages"'
    log('Adding files to be committed')
    for f in modifiedFiles:
        repo.git.add(f)
    log('Creating a commit')
    repo.git.commit(commitMessage)
else:
    log('No changes to be made.')

log('Pushing latest commits to remote')
repo.git.push()

# Go back to old branch
oldBranch.checkout()

