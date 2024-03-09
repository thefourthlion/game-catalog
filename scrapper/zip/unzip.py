import os
import zipfile
import shutil  # Import shutil for moving files


def unzip_files_in_folder(folder_path):
    # Define the paths for the extras and corrupted folders
    extras_folder = os.path.join(folder_path, 'extras')
    corrupted_folder = os.path.join(folder_path, 'corrupted')

    # Ensure the extras and corrupted folders exist
    for folder in [extras_folder, corrupted_folder]:
        if not os.path.exists(folder):
            os.makedirs(folder)

    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.zip'):
                file_path = os.path.join(root, file)
                extract_path = os.path.splitext(file_path)[0]
                try:
                    with zipfile.ZipFile(file_path, 'r') as zip_ref:
                        zip_ref.extractall(extract_path)
                    print(f"Extracted {file} to {extract_path}")
                    # Delete the zip file after successful extraction
                    os.remove(file_path)
                except FileNotFoundError as e:
                    print(f"Error extracting {file}: {e}. Moving to extras folder.")
                    shutil.move(file_path, extras_folder)
                except zipfile.BadZipFile as e:
                    print(f"Corrupted or invalid ZIP file {file}: {e}. Moving to corrupted folder.")
                    shutil.move(file_path, corrupted_folder)

        for file in files:
            if file == "Vimm's Lair.txt":
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"Deleted {file_path}")
                except FileNotFoundError as e:
                    print(f"Error deleting {file}: {e}")


folder_to_search = '../downloads'
unzip_files_in_folder(folder_to_search)
