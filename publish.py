#!/usr/bin/python

import git
import os

def log(str):
    print '###############################################'
    print str
    print '###############################################\n'

# Important parameters:
filename = 'config'
publishBranch = 'gh-pages'
repo = git.Repo.init(os.getcwd())

# Store current branch and checkout gh-pages
log(repo.git.status())
oldBranch = repo.active_branch
repo.git.checkout(publishBranch)
log(repo.git.status())

# Change config file
configFile = open(filename, 'w')
configFile.write('Publish config det')
configFile.close()

# Commit and Push the changes to gh-pages if HEAD is dirty
# Add date time in commit messgae for reference
if repo.is_dirty():
    commitMessage = '-m Add ga track code to gh-pages'
    repo.git.add(filename)
    repo.git.commit(commitMessage)
    repo.git.push()
else:
    print 'No changes to be made! Something wrong in here'

# Go back to old branch
oldBranch.checkout()
log(repo.git.status())

