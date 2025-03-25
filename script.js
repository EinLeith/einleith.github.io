document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.month-btn');
    const zodiacInfo = document.getElementById('zodiac-info');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const birthMonth = button.getAttribute('data-month');
            let info = '';

            switch (parseInt(birthMonth)) {
                case 1:
                    info = "You are a Capricorn. Symbol: 🐐. Traits: Responsible, disciplined, self-control.";
                    break;
                case 2:
                    info = "You are an Aquarius. Symbol: 🏺. Traits: Progressive, original, independent.";
                    break;
                case 3:
                    info = "You are a Pisces. Symbol: 🐟. Traits: Compassionate, artistic, intuitive.";
                    break;
                case 4:
                    info = "You are an Aries. Symbol: 🐏. Traits: Courageous, determined, confident.";
                    break;
                case 5:
                    info = "You are a Taurus. Symbol: 🐂. Traits: Reliable, patient, practical.";
                    break;
                case 6:
                    info = "You are a Gemini. Symbol: 👯. Traits: Gentle, affectionate, curious.";
                    break;
                case 7:
                    info = "You are a Cancer. Symbol: 🦀. Traits: Tenacious, highly imaginative, loyal.";
                    break;
                case 8:
                    info = "You are a Leo. Symbol: 🦁. Traits: Creative, passionate, generous.";
                    break;
                case 9:
                    info = "You are a Virgo. Symbol: 🌾. Traits: Loyal, analytical, kind.";
                    break;
                case 10:
                    info = "You are a Libra. Symbol: ⚖️. Traits: Cooperative, diplomatic, gracious.";
                    break;
                case 11:
                    info = "You are a Scorpio. Symbol: 🦂. Traits: Resourceful, brave, passionate.";
                    break;
                case 12:
                    info = "You are a Sagittarius. Symbol: 🏹. Traits: Generous, idealistic, great sense of humor.";
                    break;
                default:
                    info = "Invalid month. Please enter a number between 1 and 12.";
            }

            zodiacInfo.textContent = info;
        });
    });
});