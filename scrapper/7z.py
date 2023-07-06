import os
import shutil
import py7zr

def zip_folders_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            folder_to_zip = os.path.join(root, dir_name)
            zip_path = folder_to_zip + '.7z'
            
            with py7zr.SevenZipFile(zip_path, 'w') as archive:
                archive.writeall(folder_to_zip, os.path.basename(folder_to_zip))
            
            print(f"Zipped {folder_to_zip} to {zip_path}")
            
def delete_unzipped_folders(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            if not any(file.endswith('.7z') for file in os.listdir(dir_path)):
                shutil.rmtree(dir_path)
                print(f"Deleted {dir_path}")

folder_to_search = './downloads'

zip_folders_in_folder(folder_to_search)
delete_unzipped_folders(folder_to_search)
