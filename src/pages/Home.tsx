import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Search, Map, Loader2 } from 'lucide-react';
import { analyzeImage } from '../lib/gemini';
import SupportBlock from '../components/SupportBlock';

// Default image path
const DEFAULT_IMAGE = "/default-location.jpg"; 

// Default analysis for the location image (Fisherman's Bastion in Budapest)
const DEFAULT_ANALYSIS = `## Location Analysis

### Location Identification
🌍 **Verdict: Fisherman's Bastion, Budapest, Hungary (98% confidence)**

This is the iconic Fisherman's Bastion (Halászbástya), a neo-Gothic and neo-Romanesque terrace located on the Buda side of Budapest, Hungary. The image shows its distinctive white stone architecture, turrets, and staircase with visitors exploring the site.

### Architectural & Historical Details

1. **Architectural Features:**
   - Neo-Romanesque stone terrace with decorative turrets and spires
   - Seven fairy tale-like turrets representing the seven Magyar tribes that settled in the Carpathian Basin in 895
   - Ornate balconies and arcaded walkways with exceptional views
   - Grand staircase leading to the main terrace
   - White limestone construction creating a distinctive appearance
   - Decorative archways and colonnades

2. **Historical Significance:**
   - Built between 1895 and 1902 as part of the millennial celebrations
   - Designed by architect Frigyes Schulek
   - Named after the guild of fishermen who defended this section of the city walls in the Middle Ages
   - Purely decorative rather than defensive, unlike the original medieval walls
   - Located adjacent to Matthias Church on Castle Hill
   - Survived World War II with minimal damage, unlike many Budapest structures
   - Underwent major renovation in the 1980s and continues to be meticulously maintained

3. **Cultural Context:**
   - One of Budapest's most visited landmarks and a symbol of the city
   - Featured in numerous films, travel shows, and photography collections
   - Represents Hungary's national identity and historical pride
   - Part of the Budapest World Heritage Site
   - Popular destination for both tourists and locals
   - Frequently used as a backdrop for wedding photography and special events
   - Offers panoramic views of the Danube River and the Pest side of the city

### Geographic Information

1. **Exact Location:**
   - **Coordinates:** 47.5022° N, 19.0347° E
   - **Address:** Szentháromság tér, 1014 Budapest, Hungary
   - Located on Castle Hill in the Buda side of Budapest
   - Part of the historic Castle District (Várnegyed)
   - Situated adjacent to Matthias Church (Mátyás-templom)
   - Accessible via Fisherman's Bastion Square (Halászbástya tér)
   - Overlooking the Danube River with views of the Hungarian Parliament Building

2. **Getting There:**
   - Accessible by Bus 16 from Széll Kálmán tér (M2 metro)
   - Castle Bus (Várbusz) from Clark Ádám tér
   - Funicular railway (Budavári Sikló) from Chain Bridge
   - Ten-minute uphill walk from Batthyány tér (M2 metro)
   - Taxi or rideshare to Castle Hill
   - Castle Hill has limited vehicle access; public transportation recommended

### Visitor Information

1. **Best Times to Visit:**
   - **Seasonal Recommendations:**
     - Spring (April-May): Comfortable temperatures and fewer crowds
     - Early summer mornings (June): Before tour groups arrive
     - Fall (September-October): Beautiful autumn colors and pleasant weather
     - Winter (December): Potential for snow-covered views and Christmas markets nearby
   
   - **Time of Day:**
     - Sunrise: For photographers and empty terraces
     - Early morning (7-9am): Few tourists and golden morning light
     - Sunset and evening: Magical views of illuminated Budapest
     - Avoid midday (11am-4pm) during summer peak season due to crowds

2. **Practical Details:**
   - **Opening Hours:** Open 24 hours daily
   - **Upper Towers Entry Fee:** 
     - Adults: ~1000 HUF (~$3.50 USD)
     - Free access to the main terraces and lower walkways
     - Budapest Card holders: Free entry to upper towers
   - **Photography:** No restrictions for personal photography
   - **Accessibility:** Elevators available for those with mobility issues
   - **Facilities:** Public restrooms, cafes, and souvenir shops on site
   - **Average Visit Duration:** 30-60 minutes
   - **Wi-Fi:** Available in some areas

3. **Insider Tips:**
   - The main terrace is free to visit, only the upper towers require payment
   - Visit early morning or late evening to avoid tour groups
   - The view is equally spectacular at night when Budapest is illuminated
   - The north turret offers the best panoramic photo opportunities
   - Consider having coffee at the Fisherman's Bastion Restaurant for the view
   - Combine with a visit to nearby Matthias Church (requires separate ticket)
   - Winter visits can be magical with potential snow and fewer tourists
   - Guided Castle District tours often include knowledgeable commentary

### Nearby Attractions

1. **Immediate Vicinity (Under 5 Minutes):**
   - **Matthias Church** (Mátyás-templom): Gothic-style church with distinctive colorful roof tiles
   - **Statue of St. Stephen**: Bronze equestrian statue of Hungary's first king
   - **Hospital in the Rock Nuclear Bunker Museum**: Underground hospital used during WWII
   - **Castle Hill Funicular** (Budavári Sikló): Historic cable car connecting the hill to the Chain Bridge
   - **Hungarian National Gallery**: Major art museum housed in Buda Castle

2. **Short Walking Distance (5-15 Minutes):**
   - **Buda Castle** (Royal Palace): Former royal residence now housing museums
   - **Sándor Palace**: Official residence of the President of Hungary
   - **Vienna Gate** (Bécsi kapu): Historic entrance to Castle Hill
   - **Labyrinth of Buda Castle**: Underground cave system (note: currently closed)
   - **Széchenyi National Library**: Historic library collection

3. **Extended Area (15-30 Minutes):**
   - **Chain Bridge** (Széchenyi lánchíd): Iconic suspension bridge crossing the Danube
   - **Gellért Hill and Citadella**: Offering another panoramic viewpoint
   - **Hungarian Parliament Building**: Visible from Fisherman's Bastion across the river
   - **St. Stephen's Basilica**: Neoclassical church with observation deck
   - **Great Market Hall** (Central Market Hall): Historic indoor market
   - **Széchenyi Thermal Bath**: Famous medicinal thermal bath complex

This magnificent neo-Romanesque terrace offers some of the most spectacular views in Budapest and stands as a testament to Hungarian history and architectural prowess. While primarily built as a viewing platform rather than for defense, Fisherman's Bastion has become one of the most photographed and visited landmarks in Hungary's capital.`;

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load default image and analysis without API call
    const loadDefaultContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(DEFAULT_IMAGE);
        if (!response.ok) {
          throw new Error('Failed to load default image');
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setImage(base64data);
          setAnalysis(DEFAULT_ANALYSIS);
          setLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to load default image');
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('Error loading default image:', err);
        setError('Failed to load default image');
        setLoading(false);
      }
    };

    loadDefaultContent();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image size should be less than 20MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setError(null);
      handleAnalyze(base64String);
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);

    // Reset the file input so the same file can be selected again
    e.target.value = '';
  }, []);

  const handleAnalyze = async (imageData: string) => {
    setLoading(true);
    setError(null);
    try {
      // Using the default prompt from gemini.ts which now focuses on location identification
      const result = await analyzeImage(imageData);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatAnalysis = (text: string) => {
    const lines = text.split('\n');
    let currentSection = '';
    let inNestedList = false;
    let nestedListType = ''; // To track if we're in 'Seasonal' or 'Time of Day' sections
    
    return lines.map((line, index) => {
      // H2 headers (##)
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim();
        inNestedList = false;
        return (
          <h2 key={index} className="text-2xl font-bold text-blue-700 mt-8 mb-4">
            {currentSection}
          </h2>
        );
      }
      
      // H3 headers (###)
      if (line.startsWith('### ')) {
        currentSection = line.replace('### ', '').trim();
        inNestedList = false;
        return (
          <h3 key={index} className="text-xl font-bold text-blue-600 mt-6 mb-3">
            {currentSection}
          </h3>
        );
      }
      
      // Bold with emoji verdict
      if (line.includes('**Verdict:')) {
        const [prefix, content] = line.split('**Verdict:');
        const verdictContent = content.split('**')[0];
        const remainder = content.split('**')[1] || '';
        
        return (
          <p key={index} className="text-lg font-bold mb-4">
            {prefix}<span className="text-blue-700 font-bold">Verdict: {verdictContent}</span>{remainder}
          </p>
        );
      }
      
      // Handle subsections with ** markings (like "**Seasonal Recommendations:**")
      if (line.trim().startsWith('- **') && line.includes(':**')) {
        const titleMatch = line.match(/\*\*([^*]+)\*\*/);
        const title = titleMatch ? titleMatch[1] : '';
        
        inNestedList = true;
        nestedListType = title;
        
        return (
          <p key={index} className="font-bold text-gray-800 mt-4 mb-2 ml-6">
            {title}:
          </p>
        );
      }
      
      // Numbered list items with bold headings - section headings
      if (/^\d+\.\s\*\*[^*]+\*\*:?$/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1] || '';
        inNestedList = false;
        
        return (
          <p key={index} className="font-bold text-gray-900 mt-4 mb-2">
            {number}. {title}
          </p>
        );
      }
      
      // Numbered list items with bold text - items with descriptions
      if (/^\d+\.\s\*\*[^*]+\*\*:/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1] || '';
        const restOfLine = line.replace(/^\d+\.\s\*\*[^*]+\*\*:/, '').trim();
        inNestedList = false;
        
        return (
          <div key={index} className="mb-3">
            <p className="font-semibold text-gray-900">
              {number}. <span className="font-bold">{title}:</span>{restOfLine}
            </p>
          </div>
        );
      }
      
      // Indented bullet points with 5+ spaces (for nested lists)
      if (line.trim().startsWith('- ') && line.startsWith('     ')) {
        return (
          <li key={index} className="ml-12 mb-2 list-disc pl-1 text-gray-700">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Indented bullet points with 3-4 spaces
      if (line.trim().startsWith('- ') && (line.startsWith('   ') || line.startsWith('    '))) {
        return (
          <li key={index} className="ml-10 mb-2 list-disc pl-1 text-gray-700">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Standard bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc pl-1 text-gray-700">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular text
      return (
        <p key={index} className="mb-3 text-gray-700">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-gray-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Free AI Location Finder from Picture</h1>
          <p className="text-base sm:text-lg text-gray-600">Upload any travel photo and instantly identify locations, landmarks, and destinations around the world</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-12 border border-gray-200">
          <div className="flex flex-col items-center justify-center mb-6">
            <label 
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Upload className="h-5 w-5" />
              Upload Location Image to Identify
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageUpload}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 20MB)</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {loading && !image && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {image && (
            <div className="mb-6">
              <div className="relative rounded-lg mb-4 overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={image}
                  alt="Location to analyze"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnalyze(image)}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="-ml-1 mr-2 h-5 w-5" />
                      Identify Location
                    </>
                  )}
                </button>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Another Image
                </button>
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Map className="h-7 w-7 text-blue-600 mr-2" />
                Location Analysis
              </h2>
              <div className="text-gray-700">
                {formatAnalysis(analysis)}
              </div>
            </div>
          )}
        </div>

        <SupportBlock />

        <div className="prose max-w-none my-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Free AI Location Finder from Picture: Identify Places Instantly</h2>
          
          <p>Welcome to our cutting-edge <strong>AI location finder from picture</strong> tool, designed to help you identify places, landmarks, and destinations from your travel photos with exceptional accuracy. In today's world of endless travel possibilities, identifying unfamiliar locations you've spotted can be challenging – our <strong>AI location finder from picture</strong> is here to help.</p>

          <h3>How Our AI Location Finder from Picture Works</h3>
          <p>Our sophisticated <strong>AI location finder from picture</strong> uses advanced artificial intelligence to analyze uploaded travel photos and identify landmarks, cities, and destinations worldwide. Simply upload any location image, and our <strong>AI location finder from picture</strong> will provide a comprehensive analysis. Whether you're a casual traveler, photography enthusiast, or travel blogger, our <strong>AI location finder from picture</strong> gives you the insights you need.</p>

          <h3>Why Choose Our AI Location Finder from Picture</h3>
          <ul>
            <li>Advanced AI location recognition technology that identifies landmarks and places worldwide</li>
            <li>Detailed analysis of architectural features, historical significance, and cultural context</li>
            <li>Comprehensive travel information including best times to visit and nearby attractions</li>
            <li>Fast processing with instant results for any location you upload</li>
            <li>Personalized travel tips based on identified locations</li>
            <li>100% free to use with no hidden costs or subscriptions</li>
            <li>Privacy-focused approach that doesn't store your uploaded photos</li>
            <li>Regular updates to keep pace with evolving landmarks and destinations</li>
          </ul>

          <h3>When to Use Our AI Location Finder from Picture:</h3>
          <ul>
            <li>When you discover an intriguing location in travel content and want to identify it</li>
            <li>If you're trying to recall where a specific photo from your travels was taken</li>
            <li>When planning a trip and researching potential destinations</li>
            <li>To understand the historical and cultural significance of places you want to visit</li>
            <li>For creating accurate travel blogs or social media posts about your adventures</li>
            <li>When seeking detailed travel information about specific landmarks or destinations</li>
          </ul>

          <p>Try our <strong>AI location finder from picture</strong> today and take the guesswork out of location identification. No registration required – simply upload a travel photo and let our <strong>AI location finder from picture</strong> analyze it instantly! Our <strong>AI location finder from picture</strong> tool makes identifying places around the world easier than ever before.</p>
        </div>

        <SupportBlock />
      </div>
    </div>
  );
}