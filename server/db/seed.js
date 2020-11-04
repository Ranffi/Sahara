const { green, red } = require('chalk');
const { db, Book, Author, Genre, User } = require('./index.js')
const bcrypt = require('bcrypt')

const seedBooks = [
    {
        //id:1,
        title: 'Leave the World Behind',
        price: 27.99,
        description: "Atmospheric and provocative, Leave the World Behind starts off with Amanda and Clay's family vacation drama and soon devolves into a cinematic catastrophe. A vacation story on the surface, this unsettling novel rises above a thrilling narrative to take aim at the inherent bias we have for our fellow humans, the brotherhood in our shared fears, and the catastrophic fallout of threats both prosaic and otherworldly. Vibrant, tense and thrilling, this is an absolute must-read.",
        coverImageUrl: 'http://prodimage.images-bn.com/pimages/9780063076877_p0_v3_s550x406.jpg',
        onSale: true
    },
    {
        //id:2,
        title: 'The River',
        price: 16.00,
        description: 'Wynn and Jack have been best friends since college orientation, bonded by their shared love of mountains, books, and fishing. Wynn is a gentle giant, a Vermont kid never happier than when his feet are in the water. Jack is more rugged, raised on a ranch in Colorado where sleeping under the stars and cooking on a fire came as naturally to him as breathing. When they decide to canoe the Maskwa River in northern Canada, they anticipate long days of leisurely paddling and picking blueberries, and nights of stargazing and reading paperback Westerns. But a wildfire making its way across the forest adds unexpected urgency to the journey.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780525563532_p0_v5_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:3,
        title: 'Bestiary',
        price: 22.99,
        description: "K-Ming Chang brings her poet's voice to this visceral, bold and crackling debut. Tackling the tradition of myths and oral history, Bestiary follows the perspectives of three generations of women, with their changes in perspective as the star of the show. It successfully illustrates the evolving nature of storytelling and how it can influence our character and who we become. Ultimately a novel of family, Bestiary is full of strangely beautiful prose and is a powerfully transformative read.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780593132586_p0_v8_s550x406.jpg',
        onSale: true
    },
    {
        //id:4,
        title: 'Memorial',
        price: 22.99,
        description: "This book, in what feels like a new vision for the 21st century novel, made me happy. —Ocean Vuong, author of On Earth We’re Briefly GorgeousThis book made me think about the nature of love, and family, and anger, and grief, and love again.  —Jasmine Guillory, author of The Wedding Date and The ProposalA funny and profound story about family in all its strange forms, joyful and hard-won vulnerability, becoming who you're supposed to be, and the limits of love.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780593087275_p0_v2_s550x406.jpg',
        onSale: true
    },
    {
       // id:5,
        title: "On Earth We're Briefly Gorgeous",
        price: 23.50,
        description: 'An instant New York Times Bestseller! Longlisted for the 2019 National Book Award for Fiction, the Carnegie Medal in Fiction, the 2019 Aspen Words Literacy Prize, and the PEN/Hemingway Debut Novel Award. Shortlisted for the 2019 Center for Fiction First Novel Prize. Winner of the 2019 New England Book Award for Fiction! Named one of the most anticipated books of 2019 by Vulture, Entertainment Weekly, Buzzfeed, Los Angeles Times, Boston Globe, Oprah.com, Huffington Post, The A.V. Club, Nylon, The Week, The Rumpus, The Millions, The Guardian, Publishers Weekly, and more.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780525562023_p0_v2_s550x406.jpg',
        onSale: true
    },
    {
        //id:6,
        title: 'If Beale Street Could Talk',
        price: 13.45,
        description: 'In this honest and stunning novel that inspired the award-winning major motion picture of the same name, James Baldwin has given America a moving story of love in the face of injustice. A major work of Black American fiction. -The New Republic Told through the eyes of Tish, a nineteen-year-old girl, in love with Fonny, a young sculptor who is the father of her child, Baldwin’s story mixes the sweet and the sad',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780307275936_p0_v1_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:7,
        title: 'Stoner',
        price: 14.95,
        description: 'Discover an American masterpiece. This unassuming story about the life of a quiet English professor has earned the admiration of readers all over the globe.William Stoner is born at the end of the nineteenth century into a dirt-poor Missouri farming family. Sent to the state university to study agronomy, he instead falls in love with English literature and embraces a scholar’s life, so different from the hardscrabble existence he has known. And yet as the years pass, Stoner encounters a succession of disappointments: marriage into a “proper” family estranges him from his parents; his career is stymied; his wife and daughter turn coldly away from him; a transforming experience of new love ends under threat of scandal. Driven ever deeper within himself, Stoner rediscovers the stoic silence of his forebears and confronts an essential solitude.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781590171998_p0_v2_s550x406.jpg',
    },
    {
        //id:8,
        title: 'Going to Meet the Man',
        price: 15.95,
        description: "There's no way not to suffer. But you try all kinds of ways to keep from drowning in it. The men and women in these eight short fictions grasp this truth on an elemental level, and their stories detail the ingenious and often desperate ways in which they try to keep their head above water. It may be the heroin that a down-and-out jazz pianist uses to face the terror of pouring his life into an inanimate instrument. It may be the brittle piety of a father who can never forgive his son for his illegitimacy. Or it may be the screen of bigotry that a redneck deputy has raised to blunt the awful childhood memory of the day his parents took him to watch a black man being murdered by a gleeful mob.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780679761792_p0_v2_s550x406.jpg',
        //genre:"Novel"
    },
    {
       // id:9,
        title: 'We the Animals',
        price: 12.49,
        description: 'In this groundbreaking debut, Justin Torres plunges us into the chaotic heart of one family, the intense bonds of three brothers, and the mythic effects of this fierce love on the people we must become. We the Animals is a dark jewel of a book. It’s heartbreaking. It’s beautiful. It resembles no other book I’ve read.”—Michael Cunningham. A miracle in concentrated pages, you are going to read it again and again. —Dorothy Allison. Rumbles with lyric dynamite . . . Torres is a savage new talent.—Benjamin Percy, Esquire',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780547844190_p0_v2_s550x406.jpg',
        featured: true
    },
    {
        //id:10,
        title: 'Little Children',
        price: 17.99,
        description: "Unexpectedly suspenseful, but written with all the fluency and dark humor of Tom Perrotta's The Wishbones and Joe College, Little Children exposes the adult dramas unfolding amidst the swingsets and slides of an ordinary American playground.Tom Perrotta's thirty-ish parents of young children are a varied and surprising bunch. There's Todd, the handsome stay-at-home dad dubbed The Prom King by the moms of the playground; Sarah, a lapsed feminist with a bisexual past, who seems to have stumbled into a traditional marriage; Richard, Sarah's husband, who has found himself more and more involved with a fantasy life on the internet than with the flesh and blood in his own house; and Mary Ann, who thinks she has it all figured out, down to scheduling a weekly roll in the hay with her husband, every Tuesday at 9pm.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780312315733_p0_v6_s550x406.jpg',
        onSale: true
    },
    {
        //id:11,
        title: 'By Nightfall',
        price: 15.00,
        description: "A New York Times Bestseller. Peter and Rebecca Harris, midforties, are prosperous denizens of Manhattan. He's an art dealer, she's an editor. They live well. They have their troubles—their ebbing passions, their wayward daughter, and certain doubts about their careers—but they feel as though they're happy. Happy enough. Until Rebecca's much younger, look-alike brother, Ethan (known in the family as Mizzy, short for the Mistake), comes to visit. And after he arrives, nothing will ever be the same again.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780312610432_p0_v2_s550x406.jpg',
        onSale: true
    },
    {
        //id:12,
        title: 'Wonder Boys',
        price: 17.00,
        description: 'A modern classic, now in a welcome new edition, Wonder Boys firmly established Michael Chabon as a force to be reckoned with in American fiction. At once a deft parody of the American fame factory and a piercing portrait of young and old desire, this novel introduces two unforgettable characters: Grady Tripp, a former publishing prodigy now lost in a fog of pot and passion and stalled in the midst of his endless second book, and Grady’s student, James Leer, a budding writer obsessed with Hollywood self-destruction and struggling with his own searching heart. All those who love Michael Chabon’s The Yiddish Policemen’s Union and his Pulitzer Prize-winning The Amazing Adventures of Kavalier and Clay will find the same elegant imagination, bold humor, and undeniable warmth at work in Wonder Boys.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780812979213_p0_v1_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:13,
        title: 'The Amazing Adventures of Kavalier and Clay (Pulitzer Prize Winner)',
        price: 15.9,
        description: "WINNER OF THE PULITZER PRIZE • NEW YORK TIMES BESTSELLER • The epic, beloved novel of two boy geniuses dreaming up superheroes in New York’s Golden Age of comics, now with special bonus material by the author—soon to be a Showtime limited series. It's absolutely gosh-wow, super-colossal—smart, funny, and a continual pleasure to read.”—The Washington Post Book World.Named one of the 10 Best Books of the Decade by Entertainment Weekly • Finalist for the PEN/Faulkner Award, National Book Critics Circle Award, and Los Angeles Times Book Prize A towering, swash-buckling thrill of a book (Newsweek), hailed as Chabon’s “magnum opus” (The New York Review of Books), The Amazing Adventures of Kavalier & Clay is a triumph of originality, imagination, and storytelling, an exuberant, irresistible novel that begins in New York City in 1939.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780812983586_p0_v1_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:14,
        title: 'The Lucky One',
        price: 14.99,
        description: "A U.S. Marine's brush with death leads him to the love of his life in this New York Times bestseller of destiny, luck, and the redemptive power of romance.After U.S. Marine Logan Thibault finds a photograph of a smiling young woman buried in the dirt during his tour of duty in Iraq, he experiences a sudden streak of luck — winning poker games and even surviving deadly combat. Only his best friend, Victor, seems to have an explanation for his good fortune: the photograph — his lucky charm.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781455508969_p0_v1_s550x406.jpg',
        featured: true
    },
    {
        //id:15,
        title: "Tell the Wolves I'm Home",
        price: 15.50,
        description: '1987. There’s only one person who has ever truly understood fourteen-year-old June Elbus, and that’s her uncle, the renowned painter Finn Weiss. Shy at school and distant from her older sister, June can only be herself in Finn’s company; he is her godfather, confidant, and best friend. So when he dies, far too young, of a mysterious illness her mother can barely speak about, June’s world is turned upside down. But Finn’s death brings a surprise acquaintance into June’s life—someone who will help her to heal, and to question what she thinks she knows about Finn, her family, and even her own heart.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780812982855_p0_v3_s550x406.jpg',
        featured: true
    },
    {
        //id:16,
        title: 'A Week in Winter',
        price: 16.95,
        description: 'Stoneybridge is a small town on the west coast of Ireland where all the families know each other. When Chicky Starr decides to take an old, decaying mansion set high on the cliffs overlooking the windswept Atlantic Ocean and turn it into a restful place for a holiday by the sea, everyone thinks she is crazy. Helped by Rigger (a bad boy turned good who is handy around the house) and Orla, her niece (a whiz at business), Stone House is finally ready to welcome its first guests to the big warm kitchen, log fires, and understated elegant bedrooms. Laugh and cry with this unlikely group as they share their secrets and—maybe—even see some of their dreams come true. Full of Maeve’s trademark warmth and humor, once again, she embraces us with her grand storytelling.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780307475503_p0_v1_s550x406.jpg',
        featured: true
    },
    {
        //id:17,
        title: 'Beautiful Disaster',
        price: 14.99,
        description: ' The new Abby Abernathy is a good girl. She doesn’t drink or swear, and she has the appropriate number of cardigans in her wardrobe. Abby believes she has enough distance from the darkness of her past, but when she arrives at college with her best friend, her path to a new beginning is quickly challenged by Eastern University’s Walking One-Night Stand. ',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781476712048_p0_v3_s550x406.jpg',
        featured: true
    },
    {
        //id:18,
        title: 'The Storied Life of A. J. Fikry',
        price: 12.95,
        description: 'A. J. Fikry’s life is not at all what he expected it to be. He lives alone, his bookstore is experiencing the worst sales in its history, and now his prized possession, a rare collection of Poe poems, has been stolen. But when a mysterious package appears at the bookstore, its unexpected arrival gives Fikry the chance to make his life over--and see everything anew.   ',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781616204518_p0_v10_s550x406.jpg',
        featured: true
    },
    {
        //id:19,
        title: 'City of Thieves',
        price: 14.50,
        description: 'During the Nazis’ brutal siege of Leningrad, Lev Beniov is arrested for looting and thrown into the same cell as a handsome deserter named Kolya. Instead of being executed, Lev and Kolya are given a shot at saving their own lives by complying with an outrageous directive: secure a dozen eggs for a powerful Soviet colonel to use in his daughter’s wedding cake. In a city cut off from all supplies and suffering unbelievable deprivation, Lev and Kolya embark on a hunt through the dire lawlessness of Leningrad and behind enemy lines to find the impossible.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780452295292_p0_v3_s550x406.jpg',
        featured: true
    },
    {
        //id:20,
        title: 'The Shadow of the Wind',
        price: 15.99,
        description: 'Barcelona, 1945: A city slowly heals in the aftermath of the Spanish Civil War, and Daniel, an antiquarian book dealer’s son who mourns the loss of his mother, finds solace in a mysterious book entitled The Shadow of the Wind, by one Julián Carax. But when he sets out to find the author’s other works, he makes a shocking discovery: someone has been systematically destroying every copy of every book Carax has written. In fact, Daniel may have the last of Carax’s books in existence. Soon Daniel’s seemingly innocent quest opens a door into one of Barcelona’s darkest secrets—an epic story of murder, madness, and doomed love.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780143034902_p0_v4_s550x406.jpg',
        featured: true
    },
    {
        //id:21,
        title: 'The Art of Racing in the Rain',
        price: 14.99,
        description: 'HOW TO BE HUMAN. The New York Times bestselling novel from Garth Stein—a heart-wrenching but deeply funny and ultimately uplifting story of family, love, loyalty, and hope—a captivating look at the wonders and absurdities of human life . . . as only a dog could tell it.“Splendid.” —People.“The perfect book for anyone who knows that compassion isn’t only for humans, and that the relationship between two souls who are meant for each other never really comes to an end. Every now and then I’m lucky enough to read a novel I can’t stop thinking about: this is one of them.” —Jodi Picoult',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780061537967_p0_v8_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:22,
        title: 'A Thousand Splendid Suns',
        price: 14.95,
        description: 'Propelled by the same superb instinct for storytelling that made The Kite Runner a beloved classic, A Thousand Splendid Suns is at once an incredible chronicle of thirty years of Afghan history and a deeply moving story of family, friendship, faith, and the salvation to be found in love. After 103 weeks on the New York Times bestseller list and with four million copies of The Kite Runner shipped, Khaled Hosseini returns with a beautiful, riveting, and haunting novel that confirms his place as one of the most important literary writers today. ',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781594483851_p0_v5_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:23,
        title: 'To Kill a Mockingbird',
        price: 15.99,
        description: 'One of the most cherished stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780061120084_p0_v4_s550x406.jpg',
        onSale: true
    },
    {
        //id:24,
        title: 'The Grapes of Wrath (Pulitzer Prize Winner)',
        price: 15.99,
        description: 'First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joads—driven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780143039433_p0_v5_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:25,
        title: 'The Secret History',
        price: 15.50,
        description: 'Donna Tartt, winner of the 2014 Pulitzer Prize for her most recent novel, The Goldfinch, established herself as a major talent with The Secret History, which has become a contemporary classic. Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries. But when they go beyond the boundaries of normal morality their lives are changed profoundly and forever, and they discover how hard it can be to truly live and how easy it is to kill.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781400031702_p0_v5_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:26,
        title: 'Never Let Me Go',
        price: 14.50,
        description: 'As children Kathy, Ruth, and Tommy were students at Hailsham, an exclusive boarding school secluded in the English countryside. It was a place of mercurial cliques and mysterious rules where teachers were constantly reminding their charges of how special they were. Now, years later, Kathy is a young woman. Ruth and Tommy have reentered her life. And for the first time she is beginning to look back at their shared past and understand just what it is that makes them special—and how that gift will shape the rest of their time together. Suspenseful, moving, beautifully atmospheric, Never Let Me Go is modern classic.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9781400078776_p0_v3_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:27,
        title: 'Beautiful Ruins',
        price: 13.99,
        description: 'The #1 New York Times bestseller, now available in paperback—Jess Walter’s absolute masterpiece the story of an almost-love affair that begins on the Italian coast in 1962 and resurfaces fifty years later in contemporary Hollywood.The acclaimed, award-winning author of the national bestseller The Financial Lives of the Poets returns with his funniest, most romantic, and most purely enjoyable novel yet. Hailed by critics and loved by readers of literary and historical fiction, Beautiful Ruins is the story of an almost-love affair that begins on the Italian coast in 1962...and is rekindled in Hollywood fifty years later.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780061928178_p0_v6_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:28,
        title: 'A Tree Grows in Brooklyn',
        price: 14.99,
        description: "A special 75th anniversary edition of the beloved American classic about a young girl's coming-of-age at the turn of the twentieth century.From the moment she entered the world, Francie Nolan needed to be made of stern stuff, for growing up in the Williamsburg slums of Brooklyn, New York demanded fortitude, precocity, and strength of spirit. Often scorned by neighbors for her family’s erratic and eccentric behavior—such as her father Johnny’s taste for alcohol and Aunt Sissy’s habit of marrying serially without the formality of divorce—no one, least of all Francie, could say that the Nolans’ life lacked drama.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780060736262_p0_v11_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:29,
        title: '1Q84',
        price: 15.99,
        description: 'The year is 1984 and the city is Tokyo. A young woman named Aomame follows a taxi driver’s enigmatic suggestion and begins to notice puzzling discrepancies in the world around her. She has entered, she realizes, a parallel existence, which she calls 1Q84 —“Q is for ‘question mark.’ A world that bears a question.” Meanwhile, an aspiring writer named Tengo takes on a suspect ghostwriting project. He becomes so wrapped up with the work and its unusual author that, soon, his previously placid life begins to come unraveled.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780307476463_p0_v1_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:30,
        title: 'Hard-Boiled Wonderland and the End of the World',
        price: 15.00,
        description: 'Hyperkinetic and relentlessly inventive, Hard-Boiled Wonderland and the End of the World is Haruki Murakami’s deep dive into the very nature of consciousness.Across two parallel narratives, Murakami draws readers into a mind-bending universe in which Lauren Bacall, Bob Dylan, a split-brained data processor, a deranged scientist, his shockingly undemure granddaughter, and various thugs, librarians, and subterranean monsters collide to dazzling effect. What emerges is a novel that is at once hilariously funny and a deeply serious meditation on the nature and uses of the mind.',
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780679743460_p0_v2_s550x406.jpg',
        //genre:"Novel"
    },
    {
        //id:31,
        title: "Gravity's Rainbow",
        price: 23.00,
        description: "Winner of the 1973 National Book Award, Gravity's Rainbow is a postmodern epic, a work as exhaustively significant to the second half of the twentieth century as Joyce's Ulysses was to the first. Its sprawling, encyclopedic narrative and penetrating analysis of the impact of technology on society make it an intellectual tour de force. This Penguin Classics deluxe edition features a specially designed cover by Frank Miller along with french claps and deckle-edged paper.",
        coverImageUrl: 'https://prodimage.images-bn.com/pimages/9780143039945_p0_v2_s550x406.jpg',
        onSale: true
    }
]


const authors = [
    {firstName: 'Rumaan', lastName: 'Alam'},
    {firstName: 'Peter', lastName: 'Heller'},
    {firstName: 'K-Ming', lastName: 'Chang'},
    {firstName: 'Bryan', lastName: 'Washington'},
    {firstName: 'Ocean', lastName: 'Vuong'},
    {firstName: 'James', lastName: 'Baldwin'},
    {firstName: 'John', lastName: 'Williams'},
    {firstName: 'James', lastName: 'Baldwin'},
    {firstName: 'Justin', lastName: 'Torres'},
    {firstName: 'Tom', lastName: 'Perrotta'},
    {firstName: 'Michael', lastName: 'Cunningham'},
    {firstName: 'Michael', lastName: 'Chabon'},
    {firstName: 'Michael', lastName: 'Chabon'},
    {firstName: 'Nicholas', lastName: 'Sparks'},
    {firstName: 'Carol', lastName: 'Brunt'},
    {firstName: 'Maeve', lastName: 'Binchy'},
    {firstName: 'Jamie', lastName: 'McGuire'},
    {firstName: 'Gabrielle', lastName: 'Zevin'},
    {firstName: 'David', lastName: 'Benioff'},
    {firstName: 'Carlos', lastName: 'Zafón'},
    {firstName: 'Garth', lastName: 'Stein'},
    {firstName: 'Khaled', lastName: 'Hosseini'},
    {firstName: 'John', lastName: 'Williams'},
    {firstName: 'John', lastName: 'Steinbeck'},
    {firstName: 'Donna', lastName: 'Tartt'},
    {firstName: 'Kazuo', lastName: 'Ishiguro'},
    {firstName: 'Jess', lastName: 'Walter'},
    {firstName: 'Betty', lastName: 'Smith'},
    {firstName: 'Haruki', lastName: 'Murakami'},
    {firstName: 'Haruki', lastName: 'Murakami'},
    {firstName: 'Thomas', lastName: 'Pynchon'}
]

const genres = [
'Classic',
'Crime/detective',
'Epic',
'Fable',
'Fairy tale',
'Fantasy',
'Folktale',
'Gothic',
'Historical fiction',
'Horror',
'Humor',
'Legend',
'Magical realism',
'Mystery',
'Mythology',
'Mythopoeia',
'Realistic fiction',
'Romance',
'Satire',
'Science fiction',
'Short story',
'Spy fiction',
'Superhero fiction',
'Swashbuckler',
'Tall tale',
'Theological fiction',
'Suspense/thriller',
'Tragicomedy',
'Travel',
'Western'
]


const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(genres.map((genre) => Genre.create({ name: genre})));

    const uniqueAuthors = authors.filter((obj, ind, arr) => {
        const checkAuthor = arr.find((author) => author.firstName === obj.firstName && author.lastName === obj.lastName)
        if (checkAuthor === obj) return obj
    })

    await Promise.all(uniqueAuthors.map((author) => Author.create(author)));

    await Promise.all(seedBooks.map( async (book, ind) => {
        const bookAuthor = await Author.findOrCreateAuthor(authors[ind].firstName, authors[ind].lastName);
        book.authorId = bookAuthor.id
    }))

    await Promise.all(seedBooks.map((book) => Book.create({...book, genreId: Math.ceil(Math.random() * genres.length), authorId: book.authorId})));

    //this will need to come out before production
    const ranffiPw = await bcrypt.hash('ranffi', 10)
    await User.create({
        userName: 'ranffi',
        firstName: 'Ranffi',
        lastName: 'Ramirez',
        password: ranffiPw,
        adminStatus: true,
        email: 'ranffiramirez@gmail.com',
        isGuest: false
    })
    const johnPw = await bcrypt.hash('john', 10)
    await User.create({
        userName: 'john',
        firstName: 'John',
        lastName: 'Cook',
        password: johnPw,
        adminStatus: true,
        email: 'jpcook72@gmail.com',
        isGuest: false
    })
    const antonPw = await bcrypt.hash('anton', 10)
    await User.create({
        userName: 'anton',
        firstName: 'Anton',
        lastName: 'Perku',
        password: antonPw,
        adminStatus: true,
        email: 'antonpreku@hotmail.com',
        isGuest: false
    })
    const jamesPw = await bcrypt.hash('james', 10)
    await User.create({
        userName: 'james',
        firstName: 'James',
        lastName: 'Amato',
        password: jamesPw,
        adminStatus: true,
        email: 'jamato2514@gmail.com',
        isGuest: false
    })

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
