document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const videoTitleInput = document.getElementById('video-title');
    const generateBtn = document.getElementById('generate-btn');
    const tagsContainer = document.getElementById('tags-container');
    const tagResults = document.getElementById('tag-results');
    const copyAllBtn = document.getElementById('copy-all-btn');
    const clearBtn = document.getElementById('clear-btn');
    const tagCountElement = document.querySelector('.tag-count');
    const characterCountElement = document.querySelector('.character-count');
    const toolButtons = document.querySelectorAll('.tool-btn');

    // Enhanced tag data with more comprehensive categories and tags
    const sampleTags = {
        'gaming': ['video games', 'gameplay', 'gaming', 'let\'s play', 'walkthrough', 'game review', 'gaming channel', 'playthrough', 'gaming community', 'game tips', 'game strategy', 'gaming highlights', 'streamer', 'gamer', 'gaming setup', 'gaming live', 'pro gamer', 'gaming tutorial', 'gaming guide', 'gaming tricks', 'gaming montage', 'gaming compilation', 'gaming moments', 'gaming fails', 'gaming wins', 'gaming reaction', 'gaming commentary', 'gaming stream', 'gaming vlog', 'gaming news'],
        'tutorial': ['how to', 'tutorial', 'guide', 'step by step', 'learn', 'tips', 'tricks', 'advice', 'how-to guide', 'beginners guide', 'tutorial video', 'educational', 'learn how to', 'easy tutorial', 'quick tutorial', 'detailed guide', 'complete guide', 'ultimate guide', 'tutorial for beginners', 'advanced tutorial', 'expert tips', 'pro tips', 'helpful tips', 'tutorial series', 'instructional video', 'how to tutorial', 'diy tutorial', 'explained', 'explained simply', 'explained for beginners'],
        'vlog': ['vlog', 'daily vlog', 'life update', 'day in the life', 'lifestyle', 'vlogger', 'personal', 'life vlog', 'vlogging', 'daily life', 'routine', 'weekly vlog', 'monthly vlog', 'travel vlog', 'family vlog', 'couple vlog', 'morning routine', 'night routine', 'weekend vlog', 'vacation vlog', 'holiday vlog', 'vlog squad', 'vlog channel', 'vlogmas', 'follow me around', 'my day', 'my life', 'life as a', 'behind the scenes', 'real life'],
        'review': ['review', 'product review', 'honest review', 'unboxing', 'first impressions', 'testing', 'recommendation', 'pros and cons', 'should you buy', 'rating', 'detailed review', 'complete review', 'hands-on review', 'comparison', 'versus', 'vs', 'best', 'worst', 'top 10', 'top 5', 'ranking', 'worth it', 'not worth it', 'honest opinion', 'after using', 'long term review', 'one month later', 'one year later', 'buyer\'s guide', 'shopping guide'],
        'music': ['music', 'song', 'music video', 'official video', 'lyrics', 'audio', 'new music', 'official audio', 'album', 'artist', 'singer', 'band', 'cover song', 'live performance', 'concert', 'music festival', 'acoustic', 'remix', 'mashup', 'playlist', 'top hits', 'new release', 'music reaction', 'music review', 'music analysis', 'behind the song', 'making of', 'studio session', 'music production', 'music tutorial'],
        'comedy': ['funny', 'comedy', 'humor', 'laugh', 'jokes', 'stand up comedy', 'comedy sketch', 'hilarious', 'parody', 'comedy video', 'entertainment', 'funny moments', 'prank', 'challenge', 'reaction', 'try not to laugh', 'comedy show', 'comedian', 'satire', 'spoof', 'comedy series', 'comedy routine', 'comedy special', 'improv', 'blooper', 'outtakes', 'funny compilation', 'comedy compilation', 'comedy podcast', 'comedy reaction'],
        'food': ['recipe', 'cooking', 'food', 'how to cook', 'cooking tutorial', 'homemade', 'chef', 'delicious', 'easy recipe', 'cooking channel', 'food review', 'tasty', 'baking', 'dessert', 'meal prep', 'healthy recipe', 'vegan recipe', 'vegetarian recipe', 'gluten free', 'keto', 'low carb', 'food challenge', 'food vlog', 'mukbang', 'eating show', 'restaurant review', 'street food', 'food tour', 'cooking show', 'cooking vlog'],
        'fitness': ['workout', 'fitness', 'exercise', 'gym', 'training', 'fitness tips', 'home workout', 'weight loss', 'bodybuilding', 'fitness routine', 'health', 'fit', 'workout routine', 'full body workout', 'cardio', 'strength training', 'hiit', 'yoga', 'pilates', 'calisthenics', 'fitness challenge', 'transformation', 'before and after', 'diet plan', 'nutrition', 'meal plan', 'fitness motivation', 'fitness journey', 'personal trainer', 'fitness coach'],
        'technology': ['tech', 'technology', 'gadgets', 'tech review', 'new tech', 'smartphone', 'computer', 'software', 'hardware', 'tech news', 'tech tips', 'electronics', 'unboxing', 'setup', 'tech setup', 'tech tutorial', 'how to tech', 'tech guide', 'tech comparison', 'tech versus', 'tech vs', 'latest tech', 'future tech', 'tech innovation', 'tech trends', 'tech industry', 'tech update', 'tech overview', 'tech explained', 'tech for beginners'],
        'beauty': ['makeup', 'beauty', 'skincare', 'makeup tutorial', 'beauty tips', 'cosmetics', 'beauty routine', 'makeup review', 'beauty products', 'skincare routine', 'beauty hacks', 'makeup transformation', 'glam', 'natural makeup', 'everyday makeup', 'special occasion makeup', 'makeup collection', 'beauty haul', 'beauty favorites', 'monthly favorites', 'beauty vlog', 'get ready with me', 'grwm', 'morning routine', 'night routine', 'beauty secrets', 'beauty trends', 'beauty tips and tricks', 'beauty guru', 'beauty influencer'],
        'travel': ['travel', 'vlog', 'travel guide', 'vacation', 'trip', 'tourism', 'travel tips', 'destination', 'travel vlog', 'explore', 'adventure', 'sightseeing', 'travel diary', 'travel blog', 'travel series', 'city guide', 'country guide', 'travel hacks', 'budget travel', 'luxury travel', 'solo travel', 'family travel', 'couple travel', 'backpacking', 'road trip', 'travel itinerary', 'travel planning', 'travel recommendations', 'hidden gems', 'local experience'],
        'education': ['education', 'learning', 'study', 'knowledge', 'educational', 'school', 'college', 'university', 'academic', 'study tips', 'learning resources', 'online course', 'tutorial', 'lecture', 'lesson', 'study with me', 'study motivation', 'study routine', 'productivity', 'note taking', 'exam preparation', 'test prep', 'homework help', 'educational content', 'learning channel', 'educational video', 'study guide', 'study methods', 'learning techniques', 'academic advice'],
        'diy': ['diy', 'do it yourself', 'crafts', 'how to make', 'handmade', 'craft tutorial', 'diy project', 'creative', 'homemade', 'diy tutorial', 'arts and crafts', 'diy home decor', 'diy room decor', 'diy gifts', 'upcycling', 'repurpose', 'restoration', 'renovation', 'home improvement', 'diy hacks', 'life hacks', 'easy diy', 'quick diy', 'budget friendly', 'diy on a budget', 'diy ideas', 'diy inspiration', 'craft ideas', 'diy crafts', 'craft room'],
        'fashion': ['fashion', 'style', 'outfit', 'clothing', 'fashion tips', 'trend', 'lookbook', 'fashion haul', 'style guide', 'fashion advice', 'wardrobe', 'outfit ideas', 'outfit inspiration', 'fashion inspiration', 'fashion trends', 'seasonal fashion', 'fashion essentials', 'capsule wardrobe', 'minimalist wardrobe', 'shopping haul', 'thrift haul', 'second hand', 'sustainable fashion', 'ethical fashion', 'fashion vlog', 'get dressed with me', 'styling tips', 'how to style', 'fashion must haves', 'fashion favorites'],
        'sports': ['sports', 'highlights', 'game', 'match', 'tournament', 'team', 'player', 'championship', 'league', 'sports news', 'analysis', 'commentary', 'sports review', 'game review', 'match review', 'sports highlights', 'best moments', 'top plays', 'sports compilation', 'sports montage', 'sports documentary', 'sports story', 'sports history', 'sports facts', 'sports trivia', 'sports challenge', 'sports vlog', 'sports training', 'sports tutorial', 'sports tips'],
        'motivation': ['motivation', 'inspirational', 'success', 'motivational speech', 'inspiration', 'self improvement', 'personal development', 'goals', 'mindset', 'positive', 'growth', 'motivational video', 'inspirational video', 'success story', 'life lessons', 'life advice', 'self help', 'productivity', 'discipline', 'habits', 'routine', 'morning routine', 'success habits', 'millionaire habits', 'billionaire habits', 'entrepreneur', 'business', 'startup', 'career advice', 'life changing'],
        'general': ['best', 'top', 'how to', 'guide', 'tutorial', 'review', 'tips', 'tricks', 'advice', 'ideas', 'inspiration', 'beginner', 'advanced', 'professional', 'expert', 'ultimate', 'complete', 'comprehensive', 'detailed', 'easy', 'simple', 'quick', 'fast', 'step by step', 'explained', 'basics', 'fundamentals', 'essential', 'must know', 'popular']
    };

    // Event Listeners
    generateBtn.addEventListener('click', generateTags);
    copyAllBtn.addEventListener('click', copyAllTags);
    clearBtn.addEventListener('click', clearTags);
    videoTitleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateTags();
        }
    });
    
    // No need for tool selector buttons event listeners since we only have one button

    // Generate Tags Function
    function generateTags() {
        const videoTitle = videoTitleInput.value.trim().toLowerCase();
        
        if (!videoTitle) {
            alert('Please enter a video title or search term');
            return;
        }

        // Clear previous tags
        tagsContainer.innerHTML = '';
        
        // In a real application, you would make an API call here
        // For this demo, we'll use our sample data and some basic logic
        let generatedTags = [];
        let matchedCategory = null;
        
        // Try to find a matching category
        for (const category in sampleTags) {
            if (videoTitle.includes(category)) {
                matchedCategory = category;
                break;
            }
        }
        
        // If we found a matching category, use those tags
        if (matchedCategory) {
            generatedTags = [...sampleTags[matchedCategory]];
        } else {
            // Otherwise, use a mix of tags from different categories based on words in the title
            const words = videoTitle.split(' ');
            
            for (const word of words) {
                if (word.length < 3) continue; // Skip short words
                
                for (const category in sampleTags) {
                    const categoryTags = sampleTags[category];
                    
                    for (const tag of categoryTags) {
                        if (tag.includes(word) || word.includes(tag)) {
                            if (!generatedTags.includes(tag)) {
                                generatedTags.push(tag);
                            }
                        }
                    }
                }
            }
            
            // If we still don't have enough tags, add some general ones
            if (generatedTags.length < 5) {
                // Get random categories
                const categories = Object.keys(sampleTags);
                const randomCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 3);
                
                for (const category of randomCategories) {
                    const categoryTags = sampleTags[category];
                    const randomTags = categoryTags.sort(() => 0.5 - Math.random()).slice(0, 3);
                    
                    for (const tag of randomTags) {
                        if (!generatedTags.includes(tag)) {
                            generatedTags.push(tag);
                        }
                    }
                }
            }
        }
        
        // Add the video title words as tags if they're long enough
        const titleWords = videoTitle.split(' ');
        
        // Prioritize title words by adding them first
        for (const word of titleWords) {
            if (word.length > 2 && !generatedTags.includes(word.toLowerCase())) {
                generatedTags.push(word.toLowerCase());
            }
        }
        
        // Add word combinations from the title (2-3 word phrases)
        for (let i = 0; i < titleWords.length - 1; i++) {
            // Two-word combinations
            const twoWordPhrase = titleWords[i] + ' ' + titleWords[i+1];
            if (twoWordPhrase.length > 5 && !generatedTags.includes(twoWordPhrase.toLowerCase())) {
                generatedTags.push(twoWordPhrase.toLowerCase());
            }
            
            // Three-word combinations if possible
            if (i < titleWords.length - 2) {
                const threeWordPhrase = titleWords[i] + ' ' + titleWords[i+1] + ' ' + titleWords[i+2];
                if (threeWordPhrase.length > 8 && !generatedTags.includes(threeWordPhrase.toLowerCase())) {
                    generatedTags.push(threeWordPhrase.toLowerCase());
                }
            }
        }
        
        // Add the full title as a tag (at the beginning)
        if (!generatedTags.includes(videoTitle)) {
            generatedTags.unshift(videoTitle);
        }
        
        // Add general tags that might be relevant
        const generalTags = sampleTags['general'].sort(() => 0.5 - Math.random()).slice(0, 5);
        for (const tag of generalTags) {
            if (!generatedTags.includes(tag)) {
                generatedTags.push(tag);
            }
        }
        
        // Ensure we have at least 20 tags but no more than 30
        if (generatedTags.length < 20) {
            // Add more random tags from all categories
            const allTags = [];
            for (const category in sampleTags) {
                allTags.push(...sampleTags[category]);
            }
            
            // Shuffle and add unique tags until we reach at least 20
            const shuffledTags = allTags.sort(() => 0.5 - Math.random());
            for (const tag of shuffledTags) {
                if (!generatedTags.includes(tag)) {
                    generatedTags.push(tag);
                    if (generatedTags.length >= 25) break; // Aim for 25 tags
                }
            }
        }
        
        // Cap at 30 tags maximum
        generatedTags = generatedTags.slice(0, 30);
        
        // Remove empty state if it exists
        const emptyState = tagsContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Display the tags
        generatedTags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', function() {
                this.remove();
                updateTagCounts();
            });
            tagsContainer.appendChild(tagElement);
        });
        
        // Update tag counts
        updateTagCounts();
        
        // Show the results section
        tagResults.style.display = 'block';
    }

    // Update Tag Counts Function
    function updateTagCounts() {
        const tagElements = tagsContainer.querySelectorAll('.tag');
        const tagCount = tagElements.length;
        
        // Calculate total character count
        let characterCount = 0;
        tagElements.forEach(tag => {
            characterCount += tag.textContent.trim().length;
        });
        
        // Add commas for tag string
        if (tagCount > 0) {
            characterCount += (tagCount - 1) * 2; // Add 2 for each comma and space
        }
        
        // Update the counts in the UI
        tagCountElement.textContent = `${tagCount} tags`;
        characterCountElement.textContent = `${characterCount} characters`;
        
        // Show empty state if no tags
        if (tagCount === 0) {
            tagsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tags"></i>
                    <p>Enter a video title or keyword to generate tags</p>
                </div>
            `;
        }
    }

    // Copy All Tags Function
    function copyAllTags() {
        const tags = [];
        const tagElements = tagsContainer.querySelectorAll('.tag');
        
        tagElements.forEach(tag => {
            const tagText = tag.textContent.trim();
            tags.push(tagText);
        });
        
        if (tags.length === 0) {
            alert('No tags to copy');
            return;
        }
        
        const tagsString = tags.join(', ');
        
        // Copy to clipboard
        navigator.clipboard.writeText(tagsString)
            .then(() => {
                // Show success message
                const originalIcon = copyAllBtn.innerHTML;
                copyAllBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    copyAllBtn.innerHTML = originalIcon;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy tags. Please try again.');
            });
    }

    // Clear Tags Function
    function clearTags() {
        tagsContainer.innerHTML = '';
        updateTagCounts();
    }
    
    // Initialize empty state
    updateTagCounts();
});