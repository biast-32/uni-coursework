"""
The program asks the user for a source file name, reads its contents, and computes the number of lines and the number of words.

"""

za_file=input("Give the text file to analyze:\n")
k=0
y=0
with open(za_file) as f:
    za_lines=f.readlines()
    for line in za_lines:
        k=k+1
    print(f"Number of lines: {k}")
with open(za_file) as f:
    for za_line in f:
        za_text=za_line.split()
        for za_word in za_text:
            y=y+1
    print(f"Number of words: {y}")
