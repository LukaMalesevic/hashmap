class LinkedList
{
    constructor(head = null, tail = null)
    {   
        this._head = head;
        this._tail = tail;
    }

    head()
    {
        return this._head.value;
    }

    tail()
    {
        return this._tail.value;
    }

    toString(start = this._head, string = '')
    {
        if(start === null) return console.log('List has no nodes');
        else if(start.nextNode === null)
        {
            string += `( ${start.value} ) -> ` + this._tail.nextNode;
            return string;
        }else
        {
            string += `( ${start.value} ) -> `;
            return this.toString(start.nextNode, string);
        }
    }

    prepend(key, value) 
    {
        if(this._head === null)
        {
            const node = new Node(key, value, this._tail)
            this._tail = node;
            this._head = node;

        }else if(this._head !== null)
        {
            const node = new Node(key, value, this._head)
            this._head = node;
        }
        
    }

    append(key, value)
    {
        if(this._tail === null)
        {
            const node = new Node(key, value, null)
            this._tail = node;
            this._head = node;

        }else if(this._tail !== null)
        {
            const node = new Node(key, value, null)
            this._tail.nextNode = node;
            this._tail = node;
        }
    }

    size(start = this._head, sum = 0)
    {
        if(start === null) return sum;
        else if(start.nextNode === null) return ++sum;
        else return this.size(start.nextNode, ++sum);   
    }

    at(index, start = this._head)
    {
        if(index >= this.size()) return console.log(`List doesn't have node on index: ${index}`);
        else
        {
            if(index === 0) return start.value;
            else return this.at(--index, start.nextNode);
        }
    }

    pop(start = this._head)
    {
        if(start === null) return console.log(`List doesn't have any nodes to remove.`);
        else if(start.nextNode.nextNode === null)
        {
            start.nextNode = null;
            this._tail = start;
            return console.log('Last node has been successfully removed.');
        }
        else return this.pop(start.nextNode);   
    }

    contains(value, start = this._head)
    {
        if(start === null) return false;
        else if(start.value === value) return true;
        else return this.contains(value, start.nextNode); 
    }

    find(value, start = this._head, index = 0)
    {
        if(start === null) return null;
        else if(start.value === value) return index;
        else return this.find(value, start.nextNode, ++index); 
    }

    findKey(key, start = this._head)
    {
        if(start === null) return null;
        else if(start.key === key) return start.value;
        else return this.findKey(key, start.nextNode); 
    }

    checkIfKeyExist(key, start = this._head, index = 0)
    {
        if(start === null) return null;
        else if(start.key === key) return index;
        else return this.checkIfKeyExist(key, start.nextNode, ++index); 
    }

    insertAt(value, index, start = this._head)
    {
        if(index > this.size()) return console.log('Index is bigger than size of the list');
        else if(index === 0 && start === this._head) this.prepend(value);
        else if(index === (this.size())) this.append(value);
        else if(index === 1)
        {
            const n1 = new Node(key, value, start.nextNode);
            return start.nextNode = n1;
        }
        else return this.insertAt(value, --index, start.nextNode);
    }

    removeAt(index, start = this._head)
    {
        if(index >= this.size()) return console.log('Index is bigger than size of the list');
        else if(index === 0 && start === this._head) return this._head = start.nextNode;
        else if(index === (this.size()-1)) this.pop();
        else if(index === 1) return start.nextNode = start.nextNode.nextNode; 
        else return this.removeAt(--index, start.nextNode);
    }

    arrayOfKeys(start = this._head, arrayOfKeys = [])
    {
        if(start === null) return arrayOfKeys;
        else
        {
            arrayOfKeys.push(start.key);
            
            return this.arrayOfKeys(start.nextNode, arrayOfKeys);
        }

    }
    arrayOfValues(start = this._head, arrayOfValues = [])
    {
        if(start === null) return arrayOfValues;
        else
        {
            arrayOfValues.push(start.value);
            
            return this.arrayOfValues(start.nextNode, arrayOfValues);
        }

    }
    
    removeKey(key, start = this._head)
    {
        if(start === null) return null;
        else if(start.key === key) return this._head = start.nextNode;
        else if(start.nextNode.key === key)
        {
            if(start.nextNode.nextNode === null) return this.pop();
            else return start.nextNode = start.nextNode.nextNode;
        }
        else return this.removeKey(key, start.nextNode);   
    }

    changeValueAtIndex(index, newValue,  start = this._head)
    {
        if(index >= this.size()) return console.log(`List doesn't have node on index: ${index}`);
        else
        {
            if(index === 0) return start.value = newValue;
            else return this.changeValueAtIndex(--index, newValue, start.nextNode);
        }
    }

}

class Node
{
    constructor(key = null, value = null, nextNode = null)
    {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}


class HashMap
{
    constructor(initialCapacity, loadFactor)
    {
        this.initialCapacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.currentCapacity = 0;
        this.buckets = new Array(initialCapacity).fill(null);
        }

    hash(key)
    {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) 
        {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    } 

    set(key, value)
    {
        let hash = this.hash(key);
        hash = hash % this.initialCapacity;
        if(this.buckets[hash] === null)
        {
            this.buckets[hash] = new LinkedList();
            this.buckets[hash].append(key, value);
            this.currentCapacity++;
            if((this.currentCapacity/this.initialCapacity) >= this.loadFactor)
            {
                this.increaseCapacityAndRehash();
            }

        }else if(this.buckets[hash].checkIfKeyExist(key) === null)
        {
            this.buckets[hash].append(key, value);

        }else
        {
            const keyIndexToReplace = this.buckets[hash].checkIfKeyExist(key);
            this.buckets[hash].changeValueAtIndex(keyIndexToReplace, value);
        }
    }

    get(key)
    {
        let hash = this.hash(key);
        hash = hash % this.initialCapacity;
        if(this.buckets[hash] === null) return null;
        else return this.buckets[hash].findKey(key); 
    }

    has(key)
    {
        if(this.get(key) != null) return true;
        else return false;
    }

    remove(key)
    {
        if(this.has(key))
        {
            let hash = this.hash(key);
            hash = hash % this.initialCapacity;
            this.buckets[hash].removeKey(key);
            if(this.buckets[hash].size() === 0)
            {
                this.buckets[hash] = null;
                this.currentCapacity--;
            }
        }else return false;
    }

    length()
    {
        let sum = 0;

        this.buckets.forEach(element => {
            if(element != null) sum = sum + element.size();
        });

        return sum;
    }

    keys()
    {
        let keyArray = [];
        this.buckets.forEach(element => {
            if(element != null)
            {
                keyArray = keyArray.concat(element.arrayOfKeys())
            }
        });

        return keyArray;
    }

    values()
    {
        let valueArray = [];
        this.buckets.forEach(element => {
            if(element != null)
            {
                valueArray = valueArray.concat(element.arrayOfValues())
            }
        });

        return valueArray;   
    }

    entries()
    {
        let entries = [];
        let valueArray = this.values();
        let keyArray = this.keys();

        keyArray.forEach(function(element, index){
            entries.push([keyArray[index], valueArray[index]]);
        });

        return entries;
    }

    clear()
    {
        let arrayOfKeys = this.keys();
        arrayOfKeys.forEach(element => {
            this.remove(element);
        });
    }

    increaseCapacityAndRehash()
    {
        const keyArray = this.keys();
        const valueArray = this.values();
        this.clear();
        this.initialCapacity = this.initialCapacity * 2;
        this.buckets = new Array(this.initialCapacity).fill(null);

        keyArray.forEach((element,index) =>{
            this.set(keyArray[index],valueArray[index]);
        });
    }
    
}

const hashmap1 = new HashMap(16, 0.75);
hashmap1.buckets.forEach(element => {
    if(element != null) console.log(element.toString());
});
