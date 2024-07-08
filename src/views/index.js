$(document).ready(function() {
    function loadUsers() {
        $.get('http://localhost:3000/api/users', function(users) {
            const userTableBody = $('#userTableBody');
            userTableBody.empty();
            users.forEach(user => {
                userTableBody.append(`
                    <tr>
                        <td>${user._id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn btn-warning btn-sm editUserBtn" data-id="${user._id}">Edit</button>
                            <button class="btn btn-danger btn-sm deleteUserBtn" data-id="${user._id}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        });
    }

    $('#addUserBtn').click(function() {
        $('#userModalLabel').text('Add User');
        $('#userForm')[0].reset();
        $('#userId').val('');
        $('#saveUserBtn').text('Create');
        $('#userModal').modal('show');
    });

    $(document).on('click', '.editUserBtn', function() {
        const id = $(this).data('id');
        $.get(`http://localhost:3000/api/users/${id}`, function(user) {
            $('#userModalLabel').text('Edit User');
            $('#userId').val(user._id);
            $('#userName').val(user.name);
            $('#userEmail').val(user.email);
            $('#saveUserBtn').text('Update');
            $('#userModal').modal('show');
        });
    });

    $('#saveUserBtn').click(function() {
        const id = $('#userId').val();
        const name = $('#userName').val();
        const email = $('#userEmail').val();
        const userData = { name, email };
        const method = id ? 'put' : 'post';
        const url = id ? `http://localhost:3000/api/users/${id}` : 'http://localhost:3000/api/users';
        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function() {
                $('#userModal').modal('hide');
                loadUsers();
                alert(id ? 'User updated successfully' : 'User created successfully');
            },
            error: function(err) {
                alert('An error occurred: ' + err.responseJSON.errorResponse.errmsg);
            }
        });
    });

    $(document).on('click', '.deleteUserBtn', function() {
        const id = $(this).data('id');
        if (confirm('Are you sure you want to delete this user?')) {
            $.ajax({
                url: `http://localhost:3000/api/users/${id}`,
                method: 'delete',
                success: function() {
                    loadUsers();
                    alert('User deleted successfully');
                },
                error: function() {
                    alert('An error occurred');
                }
            });
        }
    });

    $('#searchBtn').click(function() {
        const id = $('#searchId').val();
        if (id) {
            $.get(`http://localhost:3000/api/users/${id}`, function(user) {
                const userTableBody = $('#userTableBody');
                userTableBody.empty();
                userTableBody.append(`
                    <tr>
                        <td>${user._id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn btn-warning btn-sm editUserBtn" data-id="${user._id}">Edit</button>
                            <button class="btn btn-danger btn-sm deleteUserBtn" data-id="${user._id}">Delete</button>
                        </td>
                    </tr>
                `);
            }).fail(function() {
                alert('User not found');
            });
        } else {
            loadUsers();
        }
    });

    loadUsers();
});
