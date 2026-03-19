// ===============================
//  LISTA TEMATÓW DO NAUKI
// ===============================

const topics = {

    // ============================================
    //  ANGIELSKI TEMAT 1 — PEŁNY UNIT 3
    // ============================================
    "Angielski Temat 1": [

        // VOCABULARY 1
        { pl: "akcent", en: "accent" },
        { pl: "zadanie, zadana praca", en: "assignment" },
        { pl: "pomoc, wsparcie", en: "assistance" },
        { pl: "chodzić do szkoły", en: "attend school" },
        { pl: "skupić się", en: "concentrate" },
        { pl: "nauczanie zdalne", en: "distance learning" },
        { pl: "wykonać projekt", en: "do a project" },
        { pl: "wyszukać informacje", en: "do research" },
        { pl: "wyrazić się", en: "express yourself" },
        { pl: "mieć zaległości w nauce", en: "fall behind with schoolwork" },
        { pl: "zdobywać wiedzę", en: "gain knowledge" },
        { pl: "poprawiać się", en: "get better" },
        { pl: "prowadzić rozmowę", en: "have a conversation" },
        { pl: "wysokie oczekiwania", en: "high expectations" },
        { pl: "poprawić oceny", en: "improve your grades" },
        { pl: "nabyć nową umiejętność", en: "learn a new skill" },
        { pl: "skończyć szkołę", en: "leave school" },
        { pl: "motywować", en: "motivate" },
        { pl: "rodzimy użytkownik języka", en: "native speaker" },
        { pl: "ćwiczyć", en: "practise" },
        { pl: "świadectwo szkolne", en: "school certificate" },
        { pl: "surowy", en: "strict" },
        { pl: "nadzorować", en: "supervise" },
        { pl: "oprogramowanie do wideokonferencji", en: "video conferencing app" },

        // SPEAKING
        { pl: "zajęcia pozaszkolne", en: "after-school activities" },
        { pl: "wolontariat", en: "charity work" },
        { pl: "kurs gotowania", en: "cookery course" },
        { pl: "lekcje rysunku", en: "drawing classes" },
        { pl: "zapełniać się", en: "fill up" },
        { pl: "kurs pierwszej pomocy", en: "first-aid course" },
        { pl: "zajęcia z projektowania graficznego", en: "graphic design classes" },
        { pl: "kurs produkcji muzyki", en: "music production course" },
        { pl: "zarejestrować się", en: "register" },
        { pl: "formularz rejestracyjny", en: "registration form" },
        { pl: "kurs robotyki", en: "robotics course" },
        { pl: "śpiewać w chórze", en: "sing in a choir" },

        // READING
        { pl: "kurs aktywności", en: "activity course" },
        { pl: "pokonać", en: "beat" },
        { pl: "rozczarowany", en: "disappointed" },
        { pl: "wykonać zadanie", en: "do a task" },
        { pl: "eksperymentować z", en: "experiment with" },
        { pl: "przedstawiać prezentację", en: "give a presentation" },
        { pl: "pojechać na obóz", en: "join a camp" },
        { pl: "nauczyć się prowadzić", en: "learn to drive" },
        { pl: "opanować", en: "master" },
        { pl: "okazja", en: "opportunity" },
        { pl: "uczestnik", en: "participant" },
        { pl: "zdać egzamin teoretyczny / na prawo jazdy", en: "pass your theory test / driving test" },
        { pl: "praktyczny", en: "practical" },
        { pl: "szkoła podstawowa / średnia", en: "primary / secondary school" },
        { pl: "zapisać się na kurs", en: "sign up for a course" },
        { pl: "przetrwać", en: "survive" },
        { pl: "zapisać się na zajęcia / kurs", en: "take up classes / a course" },
        { pl: "ukończyć (17) lat", en: "turn (17)" },

        // VOCABULARY 2
        { pl: "wyniki w nauce", en: "academic results" },
        { pl: "kontynuować naukę", en: "continue education" },
        { pl: "spisać pracę domową", en: "copy homework" },

        // WORDLIST
        { pl: "zdobyć stopień naukowy", en: "do a degree" },
        { pl: "mieć dobre wyniki", en: "do well" },
        { pl: "odrobić pracę domową", en: "do your homework" },
        { pl: "ekonomia", en: "economics" },
        { pl: "inżynieria", en: "engineering" },
        { pl: "oblać egzamin", en: "fail an exam" },
        { pl: "ukończyć szkołę", en: "graduate from school" },
        { pl: "prawo", en: "law" },
        { pl: "literatura", en: "literature" },
        { pl: "media i komunikacja", en: "media and communication" },
        { pl: "egzamin próbny", en: "mock exam" },
        { pl: "zdać egzamin", en: "pass an exam" },
        { pl: "słabe wyniki", en: "poor results" },
        { pl: "szkoła prywatna", en: "public school / private school" },
        { pl: "uniwersytet publiczny", en: "public university" },
        { pl: "ponownie przystąpić do egzaminu", en: "resit / retake an exam" },
        { pl: "powtarzać materiał do testu", en: "revise / review for a test" },
        { pl: "szkoła średnia", en: "secondary school / high school" },
        { pl: "szkoła publiczna", en: "state school / public school" },
        { pl: "przystąpić do testu", en: "take a test" },
        { pl: "prymus", en: "top student" },
        { pl: "weterynaria", en: "veterinary science" },

        // LISTENING
        { pl: "rozmowa wymienna", en: "do a conversation exchange" },
        { pl: "rysować mapy myśli", en: "draw mind maps" },
        { pl: "elastyczne godziny nauki", en: "flexible study hours" },
        { pl: "wykonywać polecenia", en: "follow instructions" },
        { pl: "uczyć się na pamięć", en: "learn sth by heart" },
        { pl: "słuchać podcastów", en: "listen to podcasts" },
        { pl: "słowa piosenki", en: "lyrics" },
        { pl: "uczyć się na pamięć", en: "memorise" },
        { pl: "nagrywać się", en: "record yourself" },
        { pl: "stworzyć grupę naukową", en: "set up a study group" },
        { pl: "borykać się", en: "struggle" },
        { pl: "robić notatki", en: "take / make notes" },
        { pl: "używać aplikacji edukacyjnych", en: "use educational apps" },
        { pl: "używać karteczek samoprzylepnych", en: "use sticky notes" },
        { pl: "oglądać tutoriale", en: "watch video tutorials" },

        // GRAMMAR 2
        { pl: "trwać", en: "last" },
        { pl: "poziom", en: "level" },
        { pl: "kurs szybkiego czytania", en: "speed-reading course" },

        // USE OF ENGLISH
        { pl: "wyścig", en: "race" },
        { pl: "żałować", en: "regret" },
        { pl: "przebiec maraton", en: "run a marathon" },
        { pl: "półmaraton", en: "half-marathon" },
        { pl: "trojaczki", en: "triplets" },

        // WRITING
        { pl: "zapytać o coś", en: "enquire about sth" },
        { pl: "dokonać wpłaty", en: "make a payment" },
        { pl: "uzyskać", en: "obtain" },
        { pl: "wykonać zadanie", en: "perform a task" },
        { pl: "rozwiązać problem", en: "solve a problem" },
        { pl: "kurs przetrwania", en: "survival course" }
    ]
};