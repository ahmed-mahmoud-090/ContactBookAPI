using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactBookAPI.Models;
using ContactBookAPI.Data;

namespace ContactBookAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/contact
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // POST: api/contact
        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact(Contact contact)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
        }

        // GET: api/contact/search?query=...
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Contact>>> Search(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query parameter is required.");

            var results = await _context.Contacts
                .Where(c =>
                    c.Name.Contains(query) ||
                    c.PhoneNumber.Contains(query))
                .ToListAsync();

            return Ok(results);
        }

        // PUT: api/contact/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, Contact contact)
        {
            if (id != contact.Id)
                return BadRequest("Contact ID mismatch.");

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Contacts.Any(c => c.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/contact/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
                return NotFound();

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
