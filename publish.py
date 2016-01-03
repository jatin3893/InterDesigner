#!/usr/bin/python

import git, glob, os, mmap

def log(str):
    print '###############################################'
    print str
    print '###############################################\n'

# Important parameters:
publishBranch = 'gh-pages'
modifiedFiles = []
configText = "<script>\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-49678720-3', 'auto');ga('send', 'pageview');\n</script>"
repo = git.Repo.init(os.getcwd())
print 'Publish Branch: ', publishBranch
print 'Configuration: ', configText

# Store current branch and checkout gh-pages
oldBranch = repo.active_branch
repo.git.checkout(publishBranch)

# Change all .html files with the ga code
for path, dirs, files in os.walk(os.getcwd()):
    for f in files:
        if f.endswith('.html'):
            htmlFile = open(f)
            contents = mmap.mmap(htmlFile.fileno(), 0, access = mmap.ACCESS_READ)
            if contents.find('GoogleAnalyticsObject') == -1:
                htmlFile.close()
                htmlFile = open(f, 'a')
                htmlFile.write(configText)
                modifiedFiles.append(f)
            htmlFile.close()

# Commit and Push the changes to gh-pages if HEAD is dirty
# Add date time in commit messgae for reference
if repo.is_dirty():
    commitMessage = '-m Add ga track code to gh-pages'
    for f in modifiedFiles:
        repo.git.add(f)
    repo.git.commit(commitMessage)
    repo.git.push()
else:
    print 'No changes to be made! Something wrong in here'

# Go back to old branch
oldBranch.checkout()

