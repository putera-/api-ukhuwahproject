# GIT CHEAT SHEET

## BRANCH

```sh
# List Branch
git branch

# Create New Branch
git branch [nama_branch]

# Create New Branch + Checkout
git checkout -b [nama_branch]

# Swith branch
git checkout [nama_branch]

# Rebase to master
git rebase master

# abort rebase if conflict
git rebase --abort
```

### REMOTE

```sh
# Check Remote Name
git remote -v
```

### PUSH

```sh
# push
git push

# git push branch
git push [nama_remote] [nama_branch]

# git pull branch
git pull [nama_remote] [nama_branch]
```

## COMMIT

```sh
# Add all file to stage
git add .

# Add file to stage
git add [file_name]

# Add folder to stage
git add [folder]


# Commit
git commit -m "[message]"

# Add + Commit
git commit -am "[message]"

# Edit message of the last commit
git commit --amend -m "[New Message]"

# Update previeous commit with new change, without edit message
git commit --amend --no-edit
```

## DELETE BRANCH

```SH
# delete from local
git branch -d [nama_branch]
# forece delete
git branch -D [nama_branch]

# Push delete
git push origin --delete [nama_branch]

# IN LOCAL remove unnecessary branch that deleted in remote
git fetch --prune
```
