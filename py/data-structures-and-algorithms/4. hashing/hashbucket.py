class HashBucket:
    def __init__(self, M: int, B: int):
        self.M = M
        self.B = B
        self.table = ['F'] * M
        self.tombstone = 'T'
        self.overflow = [' '] * M

    def hashFunct(self, data: str):
        sum = 0
        for i in range (0, len(data)):
            sum += ord(data[i])
        return sum % self.B

    def print(self):
        print(' '.join(self.table))
        print(' '.join(self.overflow))

    def insert (self, data: str):
        if (data in self.table or data in self.overflow):
            return
        
        iBucket = self.hashFunct(data)
        iFirst = iBucket * int(self.M / self.B)
        iLast = iFirst + int(self.M / self.B)
        
        for i in range(iFirst, iLast):
            if (self.table[i] == 'F' or self.table[i] == 'T'):
                self.table[i] = data
                return
        
        for i in range (len(self.overflow)):
            if self.overflow[i] == ' ':
                self.overflow[i] = data
                return

    def delete(self, data: str):
        iBucket = self.hashFunct(data)
        iFirst = iBucket * int(self.M / self.B)
        iLast = iFirst + int(self.M / self.B)
        
        for i in range(iFirst, iLast):
            if (self.table[i] != 'F' and self.table[i] != 'T'):
                if (self.table[i] == data):
                    self.table[i] = self.tombstone
                    return

        
        for i in range (0, len(self.overflow)):
            if (self.overflow[i] != ' '):
                if (self.overflow[i] == data):
                    self.overflow[i] = ''
                    return

if __name__ == "__main__":
    table = HashBucket(8, 4)
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