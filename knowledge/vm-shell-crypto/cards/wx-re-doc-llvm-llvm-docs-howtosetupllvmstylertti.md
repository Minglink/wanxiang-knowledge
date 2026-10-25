---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-howtosetupllvmstylertti",
  "title": "LLVM：How to set up LLVM-style RTTI for your class hierarchy",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "HowToSetUpLLVMStyleRTTI",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1da5ed5bf25e815f32348652015c31955fe4111ed4218043616ec55be4e61cb3",
  "generatedHash": "9e8a81268493c2a98aa655aead37b4a9d91cc1695e8f668516776862e73e2335",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "How to set up LLVM-style RTTI for your class hierarchy：How to set up LLVM-style RTTI for your class hierarchy",
  "l1": ".. contents:: LLVM avoids using C++'s built in RTTI. Instead, it pervasively uses its own hand-rolled form of RTTI which is much more efficient and flexible, although it requires a bit more work from you as a class author. A description of how to use LLVM-style RTTI from a client's perspective is given in the [Programmer's Manual ](ProgrammersManual.html#isa). This document, in contrast, discusses the steps you need to take as a class hierarchy author to make LLVM-style RTTI available to your clients. Before diving in, make sure that you are familiar with the Object Oriented Programming concept of \"`is-a`_\". .. _is-a: http://en.wikipedia.org/wiki/Is-a This section describes how to set up the most basic form of LLVM-style RTTI (which is sufficient for 99.9% of the cases). We will set up LLVM-style RTTI for this class hierarchy: ```c++ clas",
  "questions": [
    "HowToSetUpLLVMStyleRTTI 如何用于How to set up LLVM-style RTTI for your class hierarchy？",
    "HowToSetUpLLVMStyleRTTI 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-howtosetupllvmstylertti",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToSetUpLLVMStyleRTTI.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：How to set up LLVM-style RTTI for your class hierarchy

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：How to set up LLVM-style RTTI for your class hierarchy。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

How to set up LLVM-style RTTI for your class hierarchy

## 技术正文

## How to set up LLVM-style RTTI for your class hierarchy


.. contents::

## Background


LLVM avoids using C++'s built in RTTI. Instead, it  pervasively uses its
own hand-rolled form of RTTI which is much more efficient and flexible,
although it requires a bit more work from you as a class author.

A description of how to use LLVM-style RTTI from a client's perspective is
given in the [Programmer's Manual ](ProgrammersManual.html#isa). This
document, in contrast, discusses the steps you need to take as a class
hierarchy author to make LLVM-style RTTI available to your clients.

Before diving in, make sure that you are familiar with the Object Oriented
Programming concept of "`is-a`_".

.. _is-a: http://en.wikipedia.org/wiki/Is-a

## Basic Setup


This section describes how to set up the most basic form of LLVM-style RTTI
(which is sufficient for 99.9% of the cases). We will set up LLVM-style
RTTI for this class hierarchy:

```c++
class Shape {
public:
  Shape() {}
  virtual double computeArea() = 0;
};

class Square : public Shape {
  double SideLength;
public:
  Square(double S) : SideLength(S) {}
  double computeArea() override;
};

class Circle : public Shape {
  double Radius;
public:
  Circle(double R) : Radius(R) {}
  double computeArea() override;
};

```

The most basic working setup for LLVM-style RTTI requires the following
steps:

#. In the header where you declare `Shape`, you will want to ``#include
   "llvm/Support/Casting.h"``, which declares LLVM's RTTI templates. That
   way your clients don't even have to think about it.

```c++
#include "llvm/Support/Casting.h"

```

#. In the base class, introduce an enum which discriminates all of the
   different concrete classes in the hierarchy, and stash the enum value
   somewhere in the base class.

   Here is the code after introducing this change:

```c++
 class Shape {
 public:
+  /// Discriminator for LLVM-style RTTI (dyn_cast<> et al.)
+  enum ShapeKind {
+    SK_Square,
+    SK_Circle
+  };
+private:
+  const ShapeKind Kind;
+public:
+  ShapeKind getKind() const { return Kind; }
+
   Shape() {}
   virtual double computeArea() = 0;
 };

```

   You will usually want to keep the `Kind` member encapsulated and
   private, but let the enum `ShapeKind` be public along with providing a
   `getKind()` method. This is convenient for clients so that they can do
   a `switch` over the enum.

   A common naming convention is that these enums are "kind"s, to avoid
   ambiguity with the words "type" or "class" which have overloaded meanings
   in many contexts within LLVM. Sometimes there will be a natural name for
   it, like "opcode". Don't bikeshed over this; when in doubt use `Kind`.

   You might wonder why the `Kind` enum doesn't have an entry for
   `Shape`. The reason for this is that since `Shape` is abstract
   (`computeArea() = 0;`), you will never actually have non-derived
   instances of exactly that class (only subclasses). See `Concrete Bases
   and Deeper Hierarchies`_ for information on how to deal with
   non-abstract bases. It's worth mentioning here that unlike
   `dynamic_cast<>`, LLVM-style RTTI can be used (and is often used) for
   classes that don't have v-tables.

#. Next, you need to make sure that the `Kind` gets initialized to the
   value corresponding to the dynamic type of the class. Typically, you will
   want to have it be an argument to the constructor of the base class, and
   then pass in the respective `XXXKind` from subclass constructors.

   Here is the code after that change:

```c++
 class Shape {
 public:
   /// Discriminator for LLVM-style RTTI (dyn_cast<> et al.)
   enum ShapeKind {
     SK_Square,
     SK_Circle
   };
 private:
   const ShapeKind Kind;
 public:
   ShapeKind getKind() const { return Kind; }

-  Shape() {}
+  Shape(ShapeKind K) : Kind(K) {}
   virtual double computeArea() = 0;
 };

 class Square : public Shape {
   double SideLength;
 public:
-  Square(double S) : SideLength(S) {}
+  Square(double S) : Shape(SK_Square), SideLength(S) {}
   double computeArea() override;
 };

 class Circle : public Shape {
   double Radius;
 public:
-  Circle(double R) : Radius(R) {}
+  Circle(double R) : Shape(SK_Circle), Radius(R) {}
   double computeArea() override;
 };

```

#. Finally, you need to inform LLVM's RTTI templates how to dynamically
   determine the type of a class (i.e. whether the `isa<>`/`dyn_cast<>`
   should succeed). The default "99.9% of use cases" way to accomplish this
   is through a small static member function `classof`. In order to have
   proper context for an explanation, we will display this code first, and
   then below describe each part:

```c++
 class Shape {
 public:
   /// Discriminator for LLVM-style RTTI (dyn_cast<> et al.)
   enum ShapeKind {
     SK_Square,
     SK_Circle
   };
 private:
   const ShapeKind Kind;
 public:
   ShapeKind getKind() const { return Kind; }

   Shape(ShapeKind K) : Kind(K) {}
   virtual double computeArea() = 0;
 };

 class Square : public Shape {
   double SideLength;
 public:
   Square(double S) : Shape(SK_Square), SideLength(S) {}
   double computeArea() override;
+
+  static bool classof(const Shape *S) {
+    return S->getKind() == SK_Square;
+  }
 };

 class Circle : public Shape {
   double Radius;
 public:
   Circle(double R) : Shape(SK_Circle), Radius(R) {}
   double computeArea() override;
+
+  static bool classof(const Shape *S) {
+    return S->getKind() == SK_Circle;
+  }
 };

```

   The job of `classof` is to dynamically determine whether an object of
   a base class is in fact of a particular derived class.  In order to
   downcast a type `Base` to a type `Derived`, there needs to be a
   `classof` in `Derived` which will accept an object of type `Base`.

   To be concrete, consider the following code:

```c++
Shape *S = ...;
if (isa<Circle>(S)) {
  /* do something ... */
}

```

   The code of the `isa<>` test in this code will eventually boil
   down---after template instantiation and some other machinery---to a
   check roughly like `Circle::classof(S)`. For more information, see
   `classof-contract`.

   The argument to `classof` should always be an *ancestor* class because
   the implementation has logic to allow and optimize away
   upcasts/up-`isa<>`'s automatically. It is as though every class
   `Foo` automatically has a `classof` like:

```c++
class Foo {
  [...]
  template <class T>
  static bool classof(const T *,
                      ::std::enable_if<
                        ::std::is_base_of<Foo, T>::value
                      >::type* = 0) { return true; }
  [...]
};

```

   Note that this is the reason that we did not need to introduce a
   `classof` into `Shape`: all relevant classes derive from `Shape`,
   and `Shape` itself is abstract (has no entry in the `Kind` enum),
   so this notional inferred `classof` is all we need. See `Concrete
   Bases and Deeper Hierarchies`_ for more information about how to extend
   this example to more general hierarchies.

Although for this small example setting up LLVM-style RTTI seems like a lot
of "boilerplate", if your classes are doing anything interesting then this
will end up being a tiny fraction of the code.

## Concrete Bases and Deeper Hierarchies


For concrete bases (i.e. non-abstract interior nodes of the inheritance
tree), the `Kind` check inside `classof` needs to be a bit more
complicated. The situation differs from the example above in that

* Since the class is concrete, it must itself have an entry in the `Kind`
  enum because it is possible to have objects with this class as a dynamic
  type.

* Since the class has children, the check inside `classof` must take them
  into account.

Say that `SpecialSquare` and `OtherSpecialSquare` derive
from `Square`, and so `ShapeKind` becomes:

```c++
 enum ShapeKind {
   SK_Square,
+  SK_SpecialSquare,
+  SK_OtherSpecialSquare,
   SK_Circle
 }

```

Then in `Square`, we would need to modify the `classof` like so:

```c++
-  static bool classof(const Shape *S) {
-    return S->getKind() == SK_Square;
-  }
+  static bool classof(const Shape *S) {
+    return S->getKind() >= SK_Square &&
+           S->getKind() <= SK_OtherSpecialSquare;
+  }

```

The reason that we need to test a range like this instead of just equality
is that both `SpecialSquare` and `OtherSpecialSquare` "is-a"
`Square`, and so `classof` needs to return `true` for them.

This approach can be made to scale to arbitrarily deep hierarchies. The
trick is that you arrange the enum values so that they correspond to a
preorder traversal of the class hierarchy tree. With that arrangement, all
subclass tests can be done with two comparisons as shown above. If you just
list the class hierarchy like a list of bullet points, you'll get the
ordering right::

   | Shape
     | Square
       | SpecialSquare
       | OtherSpecialSquare
     | Circle

### A Bug to be Aware Of


The example just given opens the door to bugs where the `classof`\s are
not updated to match the `Kind` enum when adding (or removing) classes to
(from) the hierarchy.

Continuing the example above, suppose we add a `SomewhatSpecialSquare` as
a subclass of `Square`, and update the `ShapeKind` enum like so:

```c++
 enum ShapeKind {
   SK_Square,
   SK_SpecialSquare,
   SK_OtherSpecialSquare,
+  SK_SomewhatSpecialSquare,
   SK_Circle
 }

```

Now, suppose that we forget to update `Square::classof()`, so it still
looks like:

```c++
static bool classof(const Shape *S) {
  // BUG: Returns false when S->getKind() == SK_SomewhatSpecialSquare,
  // even though SomewhatSpecialSquare "is a" Square.
  return S->getKind() >= SK_Square &&
         S->getKind() <= SK_OtherSpecialSquare;
}

```

As the comment indicates, this code contains a bug. A straightforward and
non-clever way to avoid this is to introduce an explicit `SK_LastSquare`
entry in the enum when adding the first subclass(es). For example, we could
rewrite the example at the beginning of `Concrete Bases and Deeper
Hierarchies`_ as:

```c++
 enum ShapeKind {
   SK_Square,
+  SK_SpecialSquare,
+  SK_OtherSpecialSquare,
+  SK_LastSquare,
   SK_Circle
 }
...
// Square::classof()
-  static bool classof(const Shape *S) {
-    return S->getKind() == SK_Square;
-  }
+  static bool classof(const Shape *S) {
+    return S->getKind() >= SK_Square &&
+           S->getKind() <= SK_LastSquare;
+  }

```

Then, adding new subclasses is easy:

```c++
 enum ShapeKind {
   SK_Square,
   SK_SpecialSquare,
   SK_OtherSpecialSquare,
+  SK_SomewhatSpecialSquare,
   SK_LastSquare,
   SK_Circle
 }

```

Notice that `Square::classof` does not need to be changed.


### The Contract of ``classof``


To be more precise, let `classof` be inside a class `C`.  Then the
contract for `classof` is "return `true` if the dynamic type of the
argument is-a `C`".  As long as your implementation fulfills this
contract, you can tweak and optimize it as much as you want.

For example, LLVM-style RTTI can work fine in the presence of
multiple-inheritance by defining an appropriate `classof`.
An example of this in practice is
[Decl ](https://clang.llvm.org/doxygen/classclang_1_1Decl.html) vs.
[DeclContext ](https://clang.llvm.org/doxygen/classclang_1_1DeclContext.html)
inside Clang.
The `Decl` hierarchy is done very similarly to the example setup
demonstrated in this tutorial.
The key part is how to then incorporate `DeclContext`: all that is needed
is in `bool DeclContext::classof(const Decl *)`, which asks the question
"Given a `Decl`, how can I determine if it is-a `DeclContext`?".
It answers this with a simple switch over the set of `Decl` "kinds", and
returning true for ones that are known to be `DeclContext`'s.

.. TODO::

   Touch on some of the more advanced features, like `isa_impl` and
   `simplify_type`. However, those two need reference documentation in
   the form of doxygen comments as well. We need the doxygen so that we can
   say "for full details, see https://llvm.org/doxygen/..."

## Rules of Thumb


#. The `Kind` enum should have one entry per concrete class, ordered
   according to a preorder traversal of the inheritance tree.
#. The argument to `classof` should be a `const Base *`, where `Base`
   is some ancestor in the inheritance hierarchy. The argument should
   *never* be a derived class or the class itself: the template machinery
   for `isa<>` already handles this case and optimizes it.
#. For each class in the hierarchy that has no children, implement a
   `classof` that checks only against its `Kind`.
#. For each class in the hierarchy that has children, implement a
   `classof` that checks a range of the first child's `Kind` and the
   last child's `Kind`.

## RTTI for Open Class Hierarchies


Sometimes it is not possible to know all types in a hierarchy ahead of time.
For example, in the shapes hierarchy described above the authors may have
wanted their code to work for user defined shapes too. To support use cases
that require open hierarchies LLVM provides the `RTTIRoot` and
`RTTIExtends` utilities.

The `RTTIRoot` class describes an interface for performing RTTI checks. The
`RTTIExtends` class template provides an implementation of this interface
for classes derived from `RTTIRoot`. `RTTIExtends` uses the "`Curiously
Recurring Template Idiom`_", taking the class being defined as its first
template argument and the parent class as the second argument. Any class that
uses `RTTIExtends` must define a `static char ID` member, the address of
which will be used to identify the type.

This open-hierarchy RTTI support should only be used if your use case requires
it. Otherwise the standard LLVM RTTI system should be preferred.

  https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern

E.g.

```c++
class Shape : public RTTIExtends<Shape, RTTIRoot> {
public:
  static char ID;
  virtual double computeArea() = 0;
};

class Square : public RTTIExtends<Square, Shape> {
  double SideLength;
public:
  static char ID;

  Square(double S) : SideLength(S) {}
  double computeArea() override;
};

class Circle : public RTTIExtends<Circle, Shape> {
  double Radius;
public:
  static char ID;

  Circle(double R) : Radius(R) {}
  double computeArea() override;
};

char Shape::ID = 0;
char Square::ID = 0;
char Circle::ID = 0;

```

## Advanced Use Cases


The underlying implementation of isa/cast/dyn_cast is all controlled through a
struct called `CastInfo`. `CastInfo` provides 4 methods, `isPossible`,
`doCast`, `castFailed`, and `doCastIfPossible`. These are for `isa`,
`cast`, and `dyn_cast`, in order. You can control the way your cast is
performed by creating a specialization of the `CastInfo` struct (to your
desired types) that provides the same static methods as the base `CastInfo`
struct.

This can be a lot of boilerplate, so we also have what we call Cast Traits.
These are structs that provide one or more of the above methods so you can
factor out common casting patterns in your project. We provide a few in the
header file ready to be used, and we'll show a few examples motivating their
usage. These examples are not exhaustive, and adding new cast traits is easy
so users should feel free to add them to their project, or contribute them if
they're particularly useful!

### Value to value casting

In this case, we have a struct that is what we call 'nullable' - i.e. it is
constructible from `nullptr` and that results in a value you can tell is
invalid.

```c++
class SomeValue {
public:
  SomeValue(void *ptr) : ptr(ptr) {}
  void *getPointer() const { return ptr; }
  bool isValid() const { return ptr != nullptr; }
private:
  void *ptr;
};

```

Given something like this, we want to pass this object around by value, and we
would like to cast from objects of this type to some other set of objects. For
now, we assume that the types we want to cast *to* all provide `classof`. So
we can use some provided cast traits like so:

```c++
template <typename T>
struct CastInfo<T, SomeValue>
  : CastIsPossible<T, SomeValue>, NullableValueCastFailed<T>,
    DefaultDoCastIfPossible<T, SomeValue, CastInfo<T, SomeValue>> {
  static T doCast(SomeValue v) {
    return T(v.getPointer());
  }
};

```

### Pointer to value casting

Now given the value above `SomeValue`, maybe we'd like to be able to cast to
that type from a char pointer type. So what we would do in that case is:

```c++
template <typename T>
struct CastInfo<SomeValue, T *>
  : NullableValueCastFailed<SomeValue>,
    DefaultDoCastIfPossible<SomeValue, T *, CastInfo<SomeValue, T *>> {
  static bool isPossible(const T *t) {
    return std::is_same<T, char>::value;
  }
  static SomeValue doCast(const T *t) {
    return SomeValue((void *)t);
  }
};

```

This would enable us to cast from a `char *` to a SomeValue, if we wanted to.

### Optional value casting

When your types are not constructible from `nullptr` or there isn't a simple
way to tell when an object is invalid, you may want to use `std::optional`.
In those cases, you probably want something like this:

```c++
template <typename T>
struct CastInfo<T, SomeValue> : OptionalValueCast<T, SomeValue> {};

```

That cast trait requires that `T` is constructible from `const SomeValue &`
but it enables casting like so:

```c++
SomeValue someVal = ...;
std::optional<AnotherValue> valOr = dyn_cast<AnotherValue>(someVal);

```

With the `_if_present` variants, you can even do optional chaining like this:

```c++
std::optional<SomeValue> someVal = ...;
std::optional<AnotherValue> valOr = dyn_cast_if_present<AnotherValue>(someVal);

```

and `valOr` will be `std::nullopt` if either `someVal` cannot be converted *or*
if `someVal` was also `std::nullopt`.

## 来源、版本与核验

- 上游：[llvm/docs/HowToSetUpLLVMStyleRTTI.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/HowToSetUpLLVMStyleRTTI.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/HowToSetUpLLVMStyleRTTI.rst`；SHA-256：`1da5ed5bf25e815f32348652015c31955fe4111ed4218043616ec55be4e61cb3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
