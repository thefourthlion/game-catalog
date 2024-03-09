import os
import shutil
import py7zr

# Function to zip folders found within a specified directory
def zip_folders_in_folder(folder_path):
    # Iterate through all folders and subfolders within the specified directory
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            # Construct the path of the folder to be zipped
            folder_to_zip = os.path.join(root, dir_name)
            # Define the path for the resulting zip file
            zip_path = folder_to_zip + '.7z'

            # Create a 7zip archive and add all files and subdirectories of the folder
            with py7zr.SevenZipFile(zip_path, 'w') as archive:
                archive.writeall(
                    folder_to_zip, os.path.basename(folder_to_zip))

            # Print a message indicating the successful zipping of the folder
            print(f"Zipped {folder_to_zip} to {zip_path}")

# Function to delete unzipped folders within a specified directory
def delete_unzipped_folders(folder_path):
    # Iterate through all folders and subfolders within the specified directory
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            # Construct the path of the folder
            dir_path = os.path.join(root, dir_name)
            # Check if the folder does not contain any .7z files (i.e., it hasn't been zipped)
            if not any(file.endswith('.7z') for file in os.listdir(dir_path)):
                # Delete the folder and its contents
                shutil.rmtree(dir_path)
                # Print a message indicating the deletion of the unzipped folder
                print(f"Deleted {dir_path}")


# Define the directory to search for folders to zip and potentially delete
folder_to_search = './downloads'

# Zip folders within the specified directory
zip_folders_in_folder(folder_to_search)
# Delete unzipped folders within the specified directory
delete_unzipped_folders(folder_to_search)
