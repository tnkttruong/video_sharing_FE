#!/bin/bash

# Absolute paths
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_HISTORIES_DIR="$PROJECT_ROOT/build_histories"
CURRENT_DIR="$PROJECT_ROOT/current"

if [ ! -d "$BUILD_HISTORIES_DIR" ]; then
  echo "Create build_histories folder"
  mkdir "$BUILD_HISTORIES_DIR"
fi

if [ ! -d "$CURRENT_DIR" ]; then
  echo "Create current folder"
  mkdir "$CURRENT_DIR"
fi

echo "Create build folder"
build_folder=$(date +%Y%m%d%H%M%S)
mkdir -p "$BUILD_HISTORIES_DIR/$build_folder"

echo "Building Project npm run build"
cd "$PROJECT_ROOT"
npm install --force
npm run build
echo "Move code to $build_folder"
mv "$PROJECT_ROOT/build/"* "$BUILD_HISTORIES_DIR/$build_folder/"

echo "Create symbolic link to current"
ln -sf "$BUILD_HISTORIES_DIR/$build_folder/"* "$CURRENT_DIR"

# Define the number of latest folders to keep
NUM_FOLDERS_TO_KEEP=5

# Change directory to the build_histories folder
cd "$BUILD_HISTORIES_DIR"

# Get a list of all subfolders in build_histories sorted by date in descending order
FOLDERS=$(ls -t -d */)

# Get the number of folders
NUM_FOLDERS=$(echo "$FOLDERS" | wc -l)

# Check if the number of folders is greater than the number to keep
if [ $NUM_FOLDERS -gt $NUM_FOLDERS_TO_KEEP ]; then
  # Calculate the number of folders to remove
  NUM_FOLDERS_TO_REMOVE=$((NUM_FOLDERS - NUM_FOLDERS_TO_KEEP))

  # Remove the excess folders
  echo "Removing $NUM_FOLDERS_TO_REMOVE folders..."
  echo "$FOLDERS" | tail -n $NUM_FOLDERS_TO_REMOVE | xargs rm -rf
  echo "Folders removed."
else
  echo "No folders to remove."
fi
