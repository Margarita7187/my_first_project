exports.seed = async function(knex) {
  await knex('books').del();
  await knex('authors').del();
  await knex('categories').del();

  const categories = await knex('categories').insert([
    { name: 'Фантастика', description: 'Научная фантастика и фэнтези' },
    { name: 'Роман', description: 'Художественная литература' },
    { name: 'Детектив', description: 'Детективные произведения' },
    { name: 'Программирование', description: 'Техническая литература по программированию' }
  ]).returning('id');

  const authors = await knex('authors').insert([
    { name: 'Лев Толстой', bio: 'Русский писатель, философ' },
    { name: 'Федор Достоевский', bio: 'Русский писатель, мыслитель' },
    { name: 'Айзек Азимов', bio: 'Американский писатель-фантаст' },
    { name: 'Джоэл Спольски', bio: 'Программист и предприниматель' }
  ]).returning('id');

  await knex('books').insert([
    {
      title: 'Война и мир',
      isbn: '978-5-389-00001-1',
      publication_year: 1869,
      author_id: authors[0].id,
      category_id: categories[1].id,
      description: 'Роман-эпопея Льва Толстого'
    },
    {
      title: 'Преступление и наказание',
      isbn: '978-5-389-00002-2',
      publication_year: 1866,
      author_id: authors[1].id,
      category_id: categories[1].id,
      description: 'Роман Федора Достоевского'
    },
    {
      title: 'Я, робот',
      isbn: '978-5-389-00003-3',
      publication_year: 1950,
      author_id: authors[2].id,
      category_id: categories[0].id,
      description: 'Сборник научно-фантастических рассказов'
    },
    {
      title: 'Основание',
      isbn: '978-5-389-00004-4',
      publication_year: 1951,
      author_id: authors[2].id,
      category_id: categories[0].id,
      description: 'Научно-фантастический роман'
    },
    {
      title: 'Джоэл о программировании',
      isbn: '978-5-389-00005-5',
      publication_year: 2004,
      author_id: authors[3].id,
      category_id: categories[3].id,
      description: 'Сборник эссе о программировании'
    }
  ]);
};