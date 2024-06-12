import os
import zipfile
import shutil

def zip_folders_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            folder_to_zip = os.path.join(root, dir_name)
            zip_path = folder_to_zip + '.zip'
            
            try:
                with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                    for root, dirs, files in os.walk(folder_to_zip):
                        for file in files:
                            try:
                                file_path = os.path.join(root, file)
                                arcname = os.path.relpath(file_path, folder_to_zip)
                                zipf.write(file_path, arcname)
                            except FileNotFoundError as e:
                                print(f"File not found: {e}")
                print(f"Zipped {folder_to_zip} to {zip_path}")
            except FileNotFoundError as e:
                print(f"Directory not found: {e}")

def delete_unzipped_folders(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            try:
                if not any(file.endswith('.zip') for file in os.listdir(dir_path)):
                    shutil.rmtree(dir_path)
                    print(f"Deleted {dir_path}")
            except FileNotFoundError as e:
                print(f"Directory not found: {e}")

folder_to_search = '../downloads'

zip_folders_in_folder(folder_to_search)
delete_unzipped_folders(folder_to_search)
