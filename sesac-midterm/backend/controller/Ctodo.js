const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  console.log("전체 요청");

  try {
    const result = await Todo.findAll({});
    console.log("가져온값", result);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  console.log("한개만 요청!");
  try {
    const result = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });

    console.log("한개만 가져온값", result);
    // 존재하지 않는 값이면 404
    if (result === null) {
      res.status(404).send({ message: "Todo not found" });
    }
  } catch (err) {
    console.log("서버오류!", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  console.log("투두생성!:", req.body.title, req.body.done);
  try {
    const result = await Todo.create({
      title: req.body.title,
      done: req.body.done,
    });
    console.log("생성한 투두", result);
    res.send({
      title: req.body.title,
      done: req.body.done,
      updatedAt: "",
      createdAt: "",
    });
  } catch (err) {
    console.log("서버오류!", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  console.log("투두수정! 받은값:", req.params.id, req.body.done);
  try {
    const result = await Todo.update(
      {
        done: req.body.done,
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("수정한 투두", result);

    if (result == 0) {
      console.log(req.params.id, "ID는 존재하지않음");
      res.status(404).send({ message: "Todo not found" });
    } else {
      res.send({
        id: req.params.id,
        title: req.body.title,
        done: req.body.done,
      });
    }
  } catch (err) {
    console.log("서버오류!", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  console.log("투두삭제! 받은값:", req.params.id);
  try {
    const result = await Todo.destroy({
      where: { id: req.params.id },
    });

    console.log(req.params.id, "번째 todo가 삭제되었습니다", result);
    if (result == 0) {
      console.log(req.params.id, "ID는 존재하지않음");
      res.status(404).send({ message: "Todo not found" });
    } else {
      res.json({
        message: "Todo deleted successfully",
        deletedId: req.params.id,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
