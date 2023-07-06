import os
import py7zr

def extract_7z_files_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.7z'):
                file_path = os.path.join(root, file)
                extract_path = os.path.splitext(file_path)[0]  # Remove .7z extension for extraction

                with py7zr.SevenZipFile(file_path, mode='r') as archive:
                    archive.extractall(path=extract_path)
                
                print(f"Extracted {file} to {extract_path}")
                
                os.remove(file_path)  # Delete the 7z file
                
        for file in files:
            if file == "Vimm's Lair.txt":
                file_path = os.path.join(root, file)
                os.remove(file_path)  # Delete the file named "Vimm's Lair.txt"
                print(f"Deleted {file_path}")


folder_to_search = './downloads'

extract_7z_files_in_folder(folder_to_search)
