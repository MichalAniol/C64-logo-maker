# Logo Maker (nazwa robocza)

Program do optymalizacji grafiki multikolor na Commodore 64

## instalacja

Z terminala wchodzimy w katalog projektu i uruchamiany ```npm i```, powinny się zainstalować wszystkie node moules

## uruchamianie

Otwieramy trzy okna terminala, wszystkie w katalogu projektu. najłatwiej z użyciem VSCode/VSCodium. W każdym kolejno wpisujemy:

1. ```npm run g``` - uruchamia składanie kodu ```*.html``` i ```*.css``` z katalogu ```src``` do katalogu ```prod```. obserwacja zmian jest ciągła i po zapisaniu pliku ```*.html``` lub ```*.css``` w katalogu ```src``` następuje ponowne złożenie plików.

2. ```npm run w``` - uruchamia local serwer z katalogu ```prod``` pod adresem ```http://localhost:3030``` (możliwość zmiany w pliku ```watch.js```). serwer przeładowuje się automatycznie przy zmianie któregokolwiek z plików ```*.html```, ```*.css``` lub ```*.js``` w katalogu ```prod```.

3. ```npm run tsw``` - uruchamia składanie kodu ```*.js``` z katalogu ```src``` do katalogu ```prod```. obserwacja zmian jest ciągła i po zapisaniu pliku ```*.js``` w katalogu ```src``` następuje ponowne złożenie plików według kolejności zdefiniowanej w ```tsconfig.json```. Dla pojedynczego złożenia (bez ciągłości obserwacji plików) można użyć ```npm run tsb```. W VSCode/VSCodium można też użyć kombinacji klawiszy ```shift``` + ```ctrl``` + ```B``` i wybrać  ```tsc: monitoruj``` lub ```tsc: kompilacja```. Jeśli nie działa to zainstaluj: ```npm install -g typescript```.

## użycie

W katalogu ```prod/assets``` dodajemy obrazek w rozdzielczości 320 x 200 pixeli najlepiej w formacie ```*.png```. w pliku ```src/_index.html``` wyszukujemy ```<img``` (jest tylko jedno) i zmieniamy ```src``` na nazwę dodanego obrazka. Po przeładowaniu strony ```http://localhost:3030``` nastąpi przeanalizowanie wybranego obrazu.

## działanie

### origin image

Wgranie obrazka i zebranie kolorów poszczególnych pikseli

### image divided into the same chars

Podzielenie danych pikseli na fragmenty wielkości "char" 4x8. Sprawdzenie które się powtarzają i zapisanie unikalnych elementów do tablicy (bez duplikatów) oraz stworzenie tablicy ich rozmieszczenia na ekranie (40 x 25)

### the same chars with different colors

Przeszukanie tablicy charów w poszukiwaniu takich samych, ale z innymi kolorami. Bitowo są one takie same, tylko trzeba znaleźć właściwe ustawienie kolorów. W czasie przeszukiwanie budowana jest tablica kolorów (40 x 25). Na obrazku pokazane są podmienione charsy z pierwszą napotkaną kombinacją kolorów.

### szukanie podobieństw (in progress)

Wyszukiwanie zbliżonych charów różniących się od siebie 1 lub kilkoma pikselami. Po najechaniu muszką na char podświtla się gdzie występuje na obrazku.

### konwertowanie danych (in progress)

Zamienia zebrane dane do wklejenia ich w kod dla C64. link do repo składacza tych danych.