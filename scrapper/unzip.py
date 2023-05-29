import os
import zipfile

def unzip_files_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.zip'):
                file_path = os.path.join(root, file)
                extract_path = os.path.splitext(file_path)[0]  # Remove .zip extension for extraction

                with zipfile.ZipFile(file_path, 'r') as zip_ref:
                    zip_ref.extractall(extract_path)
                
                print(f"Extracted {file} to {extract_path}")
                
                os.remove(file_path)  # Delete the zip file
                
        for file in files:
            if file == "Vimm's Lair.txt":
                file_path = os.path.join(root, file)
                os.remove(file_path)  # Delete the file named "Vimm's Lair.txt"
                print(f"Deleted {file_path}")

# Usage example
folder_to_search = 'E:\programming\game-catalog\scrapper\downloads'  # Replace with the folder path you want to search

unzip_files_in_folder(folder_to_search)
