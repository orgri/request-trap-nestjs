const socket = io();
const room = window.location.pathname.split('/')[1];
const form = document.querySelector('form');
const search = document.querySelector('input');

const collapseTemplate = `
<div class="card">
  <div class="card-header" id="heading_<%= id %>">
    <h2 class="mb-0">
      <button class="btn btn-block btn-light text-left" type="button" data-toggle="collapse"
        data-target="#collapse_<%= id %>" aria-expanded="true" aria-controls="collapse_<%= id %>">
        <span class="badge badge-primary"><%= method %></span>
        <%= date %>
          <div class="float-right">
            <span class="badge badge-success">New</span>
          </div>
      </button>
    </h2>
  </div>

  <div id="collapse_<%= id %>" class="collapse" aria-labelledby="heading_<%= id %>" data-parent="#accordion">
    <div class="card-body">
      <pre><code id="requests"><%= request %></code></pre>
    </div>
  </div>
</div>`;

socket.emit('join', room);

socket.on('new', (data) => {
  const html = ejs.render(collapseTemplate, {
    id: data._id,
    date: new Date(data.createdAt).toLocaleString('en-GB'),
    method: data.method,
    request: JSON.stringify(data, null, 2),
  });
  document.querySelector('#new-request').insertAdjacentHTML('afterbegin', html);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = search.value;

  if (id) {
    window.location.href = `/${id}/requests`;
  }
});
