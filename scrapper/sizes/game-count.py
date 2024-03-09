import os


def count_folders(directory):
    # Initialize a counter
    folder_count = 0

    # Iterate over the items in the directory
    for item in os.listdir(directory):
        # Join the directory path with the item to get the full path
        item_path = os.path.join(directory, item)

        # Check if the item is a directory
        if os.path.isdir(item_path):
            folder_count += 1

    return folder_count


# Specify the directory path (using absolute path)
directory_path = os.path.abspath("../downloads")

# Call the function and print the result
print("Number of folders in", directory_path,
      ":", count_folders(directory_path))
