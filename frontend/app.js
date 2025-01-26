document.addEventListener('DOMContentLoaded', () => {
    const npcForm = document.getElementById('npc-form');
    const storyletForm = document.getElementById('storylet-form');

    npcForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const npcData = {
            id: document.getElementById('npc-id').value,
            name: document.getElementById('npc-name').value,
            traits: JSON.parse(document.getElementById('npc-traits').value),
            memory: JSON.parse(document.getElementById('npc-memory').value),
            directives: JSON.parse(document.getElementById('npc-directives').value),
            location: document.getElementById('npc-location').value,
        };

        try {
            const response = await fetch(`/npc/${npcData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(npcData),
            });

            if (response.ok) {
                alert('NPC saved successfully!');
            } else {
                alert('Failed to save NPC.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the NPC.');
        }
    });

    storyletForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const storyletData = {
            id: document.getElementById('storylet-id').value,
            conditions: JSON.parse(document.getElementById('storylet-conditions').value),
            priority: document.getElementById('storylet-priority').value,
            content: JSON.parse(document.getElementById('storylet-content').value),
            outcomes: JSON.parse(document.getElementById('storylet-outcomes').value),
        };

        try {
            const response = await fetch(`/storylet/${storyletData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storyletData),
            });

            if (response.ok) {
                alert('Storylet saved successfully!');
            } else {
                alert('Failed to save Storylet.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the Storylet.');
        }
    });
});
