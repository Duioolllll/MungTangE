import assert from 'node:assert/strict';

export const taskChecks = {
  'contact-form': [
    ['invalid email shows an error', async page => {
      await page.getByTestId('name').fill('Alex Kim');
      await page.getByTestId('email').fill('not-an-email');
      await page.getByTestId('message').fill('Hi there');
      await page.getByTestId('submit').click();
      assert.equal(await page.getByTestId('status').getAttribute('data-state'),'error');
    }],
    ['valid submission confirms success', async page => {
      await page.getByTestId('name').fill('Alex Kim');
      await page.getByTestId('email').fill('alex@example.test');
      await page.getByTestId('message').fill('A specific question');
      await page.getByTestId('submit').click();
      assert.equal(await page.getByTestId('status').getAttribute('data-state'),'success');
    }]
  ],
  'todo-list': [
    ['adding a todo shows content', async page => {
      await page.getByTestId('todo-input').fill('Plan release');
      await page.getByTestId('add-todo').click();
      const item=page.getByTestId('todo-item').filter({hasText:'Plan release'});
      assert.equal(await item.count(),1);
    }],
    ['toggle marks item as done', async page => {
      await page.getByTestId('todo-input').fill('Review code');
      await page.getByTestId('add-todo').click();
      const item=page.getByTestId('todo-item').filter({hasText:'Review code'});
      await item.getByTestId('toggle-todo').click();
      assert.equal(await item.getAttribute('data-state'),'done');
    }],
    ['delete removes the todo', async page => {
      await page.getByTestId('todo-input').fill('Delete me');
      await page.getByTestId('add-todo').click();
      await page.getByTestId('todo-item').filter({hasText:'Delete me'}).getByTestId('delete-todo').click();
      assert.equal(await page.getByTestId('todo-item').filter({hasText:'Delete me'}).count(),0);
    }]
  ],
  'faq-accordion': [
    ['FAQ opens and closes with correct semantics', async page => {
      const toggles=page.getByTestId('faq-toggle'),panels=page.getByTestId('faq-panel');
      assert.ok(await toggles.count()>=3);
      assert.equal(await toggles.nth(0).getAttribute('aria-expanded'),'false');
      await toggles.nth(0).click();
      assert.equal(await toggles.nth(0).getAttribute('aria-expanded'),'true');
      assert.ok(await panels.nth(0).isVisible());
      await toggles.nth(0).click();
      assert.equal(await toggles.nth(0).getAttribute('aria-expanded'),'false');
      assert.equal(await panels.nth(0).isVisible(),false);
    }],
    ['FAQ can be opened from keyboard', async page => {
      const toggle=page.getByTestId('faq-toggle').nth(1);
      await toggle.focus();
      await page.keyboard.press('Enter');
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    }]
  ],
  'mobile-navigation': [
    ['mobile menu toggles visible navigation', async page => {
      await page.setViewportSize({width:375,height:900});
      const toggle=page.getByTestId('menu-toggle');
      const menu=page.getByTestId('nav-menu');
      assert.equal(await toggle.getAttribute('aria-expanded'),'false');
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      assert.ok(await menu.isVisible());
      assert.ok(await menu.getByTestId('nav-link').count()>=2);
    }],
    ['Escape closes mobile menu', async page => {
      await page.setViewportSize({width:375,height:900});
      const toggle=page.getByTestId('menu-toggle');
      await toggle.click();
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    }]
  ],
  'product-filter': [
    ['books category filters visible cards', async page => {
      const filter=page.getByTestId('category-filter');
      await filter.selectOption('books');
      const cards=page.getByTestId('product-card');
      const count=await cards.count();
      assert.ok(count>=1);
      for(let i=0;i<count;i++){
        const card=cards.nth(i);
        if(await card.isVisible()) assert.equal(await card.getAttribute('data-category'),'books');
      }
      assert.ok(await cards.filter({visible:true}).count()>=1);
    }],
    ['search and reset update results', async page => {
      const cards=page.getByTestId('product-card');
      assert.ok(await cards.count()>=6);
      await page.getByTestId('search-input').fill('a search query that should not match 93348');
      assert.equal(await cards.filter({visible:true}).count(),0);
      await page.getByTestId('search-input').fill('');
      await page.getByTestId('category-filter').selectOption('all');
      assert.ok(await cards.filter({visible:true}).count()>=6);
    }]
  ],
  'signup-validation': [
    ['password mismatch is rejected', async page => {
      await page.getByTestId('signup-email').fill('test@example.test');
      await page.getByTestId('password').fill('StrongPassword123!');
      await page.getByTestId('confirm-password').fill('DifferentPassword123!');
      await page.getByTestId('signup-submit').click();
      assert.equal(await page.getByTestId('signup-status').getAttribute('data-state'),'error');
    }],
    ['matching password confirms local success', async page => {
      await page.getByTestId('signup-email').fill('test@example.test');
      await page.getByTestId('password').fill('StrongPassword123!');
      await page.getByTestId('confirm-password').fill('StrongPassword123!');
      await page.getByTestId('signup-submit').click();
      assert.equal(await page.getByTestId('signup-status').getAttribute('data-state'),'success');
    }]
  ],
  'sortable-table': [
    ['sort amount orders numeric rows', async page => {
      const rows=page.getByTestId('table-row');
      assert.ok(await rows.count()>=5);
      await page.getByTestId('sort-amount').click();
      const values=await rows.evaluateAll(nodes=>nodes.filter(n=>n.getClientRects().length).map(n=>Number(n.getAttribute('data-amount'))));
      assert.ok(values.length>=5);
      assert.ok(values.every((v,i,a)=>i===0||v>=a[i-1])||values.every((v,i,a)=>i===0||v<=a[i-1]));
      await page.getByTestId('sort-amount').click();
      const swapped=await rows.evaluateAll(nodes=>nodes.filter(n=>n.getClientRects().length).map(n=>Number(n.getAttribute('data-amount'))));
      assert.deepEqual(swapped,[...values].reverse());
    }],
    ['no matches shows empty state', async page => {
      await page.getByTestId('table-search').fill('no-row-will-have-this-string-2875937');
      assert.ok(await page.getByTestId('empty-state').isVisible());
    }]
  ],
  'modal-dialog': [
    ['Escape closes dialog and restores focus', async page => {
      const open=page.getByTestId('open-dialog');
      await open.click();
      assert.ok(await page.getByRole('dialog').isVisible());
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('dialog').isVisible(),false);
      assert.equal(await open.evaluate(el=>el===document.activeElement),true);
    }],
    ['close button dismisses named dialog', async page => {
      await page.getByTestId('open-dialog').click();
      const dialog=page.getByRole('dialog');
      assert.ok((await dialog.getAttribute('aria-label'))||(await dialog.getAttribute('aria-labelledby')));
      await page.getByTestId('close-dialog').click();
      assert.equal(await dialog.isVisible(),false);
    }]
  ],
  'price-calculator': [
    ['quantity and price update total', async page => {
      await page.getByTestId('quantity').fill('3');
      await page.getByTestId('unit-price').fill('19');
      const total=(await page.getByTestId('total').innerText()).replace(/[^0-9.]/g,'');
      assert.equal(Number(total),57);
    }],
    ['total changes after quantity update', async page => {
      await page.getByTestId('quantity').fill('2');
      await page.getByTestId('unit-price').fill('25');
      await page.getByTestId('quantity').fill('4');
      const total=(await page.getByTestId('total').innerText()).replace(/[^0-9.]/g,'');
      assert.equal(Number(total),100);
    }]
  ],
  'keyboard-tabs': [
    ['click switches selected tab and panel', async page => {
      assert.equal(await page.getByRole('tab').count(),3);
      const details=page.getByTestId('tab-details');
      await details.click();
      assert.equal(await details.getAttribute('aria-selected'),'true');
      const id=await details.getAttribute('aria-controls');
      assert.ok(id);
      assert.ok(await page.locator('[id="'+id+'"]').isVisible());
    }],
    ['arrow navigation reaches next tab', async page => {
      const overview=page.getByTestId('tab-overview'),details=page.getByTestId('tab-details');
      await overview.focus();
      await page.keyboard.press('ArrowRight');
      assert.ok(await details.evaluate(el=>el===document.activeElement)||await details.getAttribute('aria-selected')==='true');
    }]
  ]
};

export async function runFunctionalChecks(page,url,taskId){
  const suite=taskChecks[taskId];
  if(!suite)throw Error('No assertions for task '+taskId);
  const checks=[];
  for(const [name,action] of suite){
    try{
      await page.setViewportSize({width:1440,height:900});
      await page.goto(url,{waitUntil:'load',timeout:15000});
      await action(page);
      checks.push({name,status:'pass'});
    }catch(e){
      checks.push({name,status:'fail',error:String(e.message||e).slice(0,500)});
    }
  }
  return checks;
}
