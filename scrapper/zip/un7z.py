import os
import patoolib
import mimetypes

def is_valid_7z(file_path):
    # Check if the file has the correct 7z header
    with open(file_path, 'rb') as f:
        header = f.read(6)
    return header == b'7z\xBC\xAF\x27\x1C'

def identify_file_type(file_path):
    # Use mimetypes to identify the file type
    file_type, encoding = mimetypes.guess_type(file_path)
    return file_type if file_type else "Unknown"

def extract_file(file_path, extract_path):
    try:
        patoolib.extract_archive(file_path, outdir=extract_path)
        print(f"Extracted {file_path} to {extract_path}")
        os.remove(file_path)  # Delete the archive file
    except Exception as e:
        print(f"Failed to extract {file_path}: {e}")

def extract_files_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            extract_path = os.path.splitext(file_path)[0]  # Remove extension for extraction

            try:
                file_size = os.path.getsize(file_path)
                if file_size == 0:
                    print(f"File {file_path} is empty, skipping.")
                    continue

                file_type = identify_file_type(file_path)
                print(f"Processing {file_path}, identified type: {file_type}")

                if file.endswith('.7z') and is_valid_7z(file_path):
                    extract_file(file_path, extract_path)
                elif file_type.startswith('application'):
                    extract_file(file_path, extract_path)
                else:
                    print(f"Skipping {file_path}: Unsupported file type")
            except Exception as e:
                print(f"An error occurred while processing {file_path}: {e}")

        for file in files:
            if file == "Vimm's Lair.txt":
                file_path = os.path.join(root, file)
                os.remove(file_path)  # Delete the file named "Vimm's Lair.txt"
                print(f"Deleted {file_path}")

folder_to_search = r"../downloads"

extract_files_in_folder(folder_to_search)
