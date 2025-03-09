class HashLinear:
    def __init__(self, M: int):
        self.M = M
        self.table = ['F'] * M
        self.tombstone = 'T'

    def hashFunct(self, data: str):
        sum = 0
        for i in range (0, len(data)):
            sum += ord(data[i])
        return sum % self.M

    def print(self):
        print(' '.join(self.table))

    def insert (self, data: str):
        if (data in self.table):
            return
        
        i = self.hashFunct(data)
        iFirst = i
        
        while (self.table[i] != 'F' and self.table[i] != 'T'):
            i = (i + 1) % self.M
            if (i == iFirst):
                return
        
        self.table[i] = data
        
    def delete(self, data: str):
        i = self.hashFunct(data)
        iFirst = i
        
        while (self.table[i] != 'F'):
            if (self.table[i] == data):
                self.table[i] = self.tombstone
                return
            i = (i + 1) % self.M
            if (i == iFirst):
                return

if __name__ == "__main__":
    table = HashLinear(8)
    table.print()

    table.insert("apple")
    table.insert("orange")
    table.insert("banana")
    table.insert("grapes")
    table.insert("mango")
    table.insert("peach")
    table.insert("apple")
    table.print()

    table.delete("banana")
    table.delete("kiwi")
    table.delete("peach")
    table.print()