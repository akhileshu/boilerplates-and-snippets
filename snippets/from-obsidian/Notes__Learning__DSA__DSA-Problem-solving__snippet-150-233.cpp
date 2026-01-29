#include <bits/stdc++.h>
using namespace std;

// Function Example
string printName(string name) {
    return name;
}

int main() {
    // 📌 Input/Output
    int x, y;
    cin >> x >> y;
    cout << "Value of x: " << x << endl;

    // 📌 Variables (same name cannot be re-declared)
    int a = 10;
    long long b = 15000000;
    float c = 5.7;
    float d = 5;        // float with int value
    double e = 5;       // more precision than float
    char ch = 'g';

    // 📌 Strings
    string s;
    cin.ignore();       // clear input buffer before getline
    getline(cin, s);
    string name = "akhilesh";
    int len = name.size();
    cout << name[0] << endl;  // 'a'

    // 📌 If-Else
    if (true) {
        cout << "Hey, Striver!!" << endl;
    } else if (false) {
        cout << "Hey Again!" << endl;
    } else {
        cout << "Else block" << endl;
    }

    // 📌 Switch
    int day = 1;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        default:
            cout << "Other day" << endl;
            break;
    }

    // 📌 Array
    int arr[5];               // 0-based index
    arr[3] = 9;
    cout << arr[3] << endl;

    // 📌 2D Array
    int grid[3][5];           // 3 rows, 5 columns

    // 📌 Loops
    for (int i = 0; i < 5; i++) 
        cout << i << " ";
    cout << endl;

    int i = 0;
    while (i < 5) {
        cout << i << " ";
        i++;
    }
    cout << endl;

    i = 0;
    do {
        cout << i << " ";
        i++;
    } while (i < 5);
    cout << endl;

    // 📌 Function Call
    cout << printName("Striver") << endl;

    return 0;
}