import os

def check_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if not file.endswith('.zip'):
                print(file)

# Replace 'folder_path' with the actual path of the folder you want to check
folder_path = 'D:\programming\game-catalog\scrapper\downloads'
check_folder(folder_path)
