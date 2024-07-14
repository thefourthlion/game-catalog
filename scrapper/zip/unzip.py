import os
import py7zr

def extract_7z_files_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.7z'):
                file_path = os.path.join(root, file)
                extract_path = os.path.splitext(file_path)[0]  # Remove .7z extension for extraction

                try:
                    file_size = os.path.getsize(file_path)
                    if file_size == 0:
                        print(f"File {file_path} is empty, skipping.")
                        continue

                    with py7zr.SevenZipFile(file_path, mode='r') as archive:
                        archive.extractall(path=extract_path)
                    print(f"Extracted {file} to {extract_path}")
                    os.remove(file_path)  # Delete the 7z file
                except py7zr.exceptions.Bad7zFile:
                    print(f"Failed to extract {file_path}: Not a valid 7z file")
                except Exception as e:
                    print(f"An error occurred while extracting {file_path}: {e}")

        for file in files:
            if file == "Vimm's Lair.txt":
                file_path = os.path.join(root, file)
                os.remove(file_path)  # Delete the file named "Vimm's Lair.txt"
                print(f"Deleted {file_path}")

folder_to_search = r"../downloads"

extract_7z_files_in_folder(folder_to_search)
